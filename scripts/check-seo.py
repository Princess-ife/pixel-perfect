import sys
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree
import requests

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8080').rstrip('/')
class Head(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.meta = {}
        self.canonical = []
        self.feed(html)
    def handle_starttag(self, tag, attributes):
        attributes = dict(attributes)
        if tag == 'meta':
            key = attributes.get('property', attributes.get('name'))
            if key:
                self.meta.setdefault(key, []).append(attributes.get('content'))
        if tag == 'link' and attributes.get('rel') == 'canonical':
            self.canonical.append(attributes.get('href'))

response = requests.get(base + '/sitemap.xml', timeout=20)
assert response.status_code == 200, response.text[:300]
root = ElementTree.fromstring(response.text)
urls = [element.text for element in root.iter('{http://www.sitemaps.org/schemas/sitemap/0.9}loc')]
assert len(urls) > 5 and len(urls) == len(set(urls)), urls
for url in urls:
    response = requests.get(url, timeout=20)
    assert response.status_code == 200, (url, response.status_code, response.text[:200])
    head = Head(response.text)
    assert head.canonical == [url], (url, head.canonical)
    for key in ['description', 'og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt', 'twitter:card', 'twitter:title', 'twitter:description', 'twitter:image']:
        assert len(head.meta.get(key, [])) == 1 and head.meta[key][0], (url, key, head.meta.get(key))
    assert head.meta['og:url'] == [url], (url, head.meta['og:url'])
    assert head.meta['og:image'] == [base + '/images/og/portfolio.jpg']
print(f'Verified metadata and canonical URLs for all {len(urls)} pages')
robots = requests.get(base + '/robots.txt', timeout=20)
assert robots.status_code == 200 and f'Sitemap: {base}/sitemap.xml' in robots.text
assert requests.get(base + '/images/og/portfolio.jpg', timeout=10).headers['content-type'].startswith('image/')
for route in ['/work/not-a-project', '/not-a-page']:
    response = requests.get(base + route, timeout=20)
    assert response.status_code == 404, (route, response.status_code)
    assert Head(response.text).meta.get('robots') == ['noindex'], (route, Head(response.text).meta.get('robots'))
print('Verified robots.txt, sharing image, and noindex on 404 pages')
