# Project story sources

Reviewed on 21 October 2026. Portfolio text is maintained in `src/data/projects.ts`.
Only the project detail page's existing section pattern was extended, to include an optional scope and limitations section.

## Ronin segmentation

- [Repository and README](https://github.com/Princess-ife/Ronin-User-Segmentation-For-Retention-And-Growth-Strategy)
- The README describes Dune extraction, feature engineering, 7,000 initial rows, 6,743 retained rows, scaling, and four clustering methods.
- It explicitly says silhouette analysis favoured four clusters and five were chosen for business interpretation. The portfolio retains this distinction.
- Segment counts and names vary across README sections and the live app. Exact segment percentages, bot identification, and a single headline silhouette score are therefore omitted.
- Retention improvement and actual future churn were not measured in the supplied evidence.

## Sui ecosystem analysis

- [Repository](https://github.com/Princess-ife/Sui-project-analysis)
- Reviewed `README.md`, `Sui_project_analysis.py`, and `sui_dune_analytics.sql`.
- The pipeline handles six dataset categories. SQL calculates protocol shares from the sum of tracked protocol TVLs and joins ecosystem TVL and DEX volume by day.
- The README's sample financial values are illustrative, not verified results. No current TVL, volume, or protocol-ranking claim was added.
- Dataset completeness, missing-value handling, API freshness, and the tracked-set denominator constrain interpretation.

## Spotify classifier

- [Repository](https://github.com/Princess-ife/What-Makes-A-Hit-Spotify-EDA)
- Reviewed the README, EDA and modelling notebooks, `app/app.py`, and the homepage template.
- The final documented notebook iteration uses 80,398 tracks, ten inputs, a stratified 80/20 split, SMOTE on training data, and Random Forest classification.
- Its saved classification report records 0.69 overall accuracy on 16,080 test tracks, with Viral precision 0.16 and recall 0.27. These are saved experimental outputs, not independently reproduced results.
- Earlier iterations differ. The app downloads model artifacts from Hugging Face, so notebook and deployment version equivalence is not assumed.
- The target is a historical popularity tier, not prospective commercial success.

## Pima feature selection

- [Repository](https://github.com/Princess-ife/pima-diabetes-feature-selection)
- Reviewed the README and `pima_indians_diabetes_eda.ipynb`.
- Saved outputs support 768 records, eight predictors, median imputation, Chi-squared/RFE/PCA/ExtraTrees comparisons, and the recorded accuracies of 75.3%, 76.6%, and 77.9%.
- Feature selection and parts of preprocessing occur before the train-test split. Results are described as exploratory, not an independent generalisation estimate or clinical validation.

## IoMT research and application

- [Research notes](https://docs.google.com/document/d/1FGZfhOLEoqovKDKcixOCwrDvcn8hBgAD2VGy88c9zIg/edit)
- The notes describe vital-sign distributions, blood-pressure coverage, and concerns about synthetic data. They do not establish a clinical validation study.
- The existing live app identifies Isolation Forest and shows derived pulse pressure and mean arterial pressure.
- The user confirmed on 21 October 2026 that the 50,000-record dataset came from Kaggle. Its exact dataset URL has not been supplied, so no specific Kaggle dataset is linked or inferred.
- The supplied résumé reports 2,500 anomaly flags across 50,000 synthetic records using seven features (5%). The interface links to that résumé and labels the result as reported; it is not clinical validation or a count of diagnosed patients.

## Results context and provenance

- Result cards link to the user-supplied résumé PDF. These are reported figures, not independently audited results.
- BOB Nigeria: 58 to 1,000 followers means 942 additional followers and approximately 1,624% growth. November 2025–July 2026 are role dates; exact measurement dates are unspecified.
- LayerZero: 30,000+ X impressions are an overall reported total, not a verified sum of the four linked samples. The résumé lists the role as November 2024–January 2026.
- Mall: five K-Means groups from approximately 200 customers support marketing recommendations; no measured sales uplift is claimed.
- DRID: 204 correct answers out of 250 MCQs equals 81.6%, measured against expert-validated answers across four university courses. The finding applies to this question set; a public study report has not been supplied.
- Detailed app implementation ownership and any PyTorch component are not established by these notes alone. No PyTorch implementation claim was added.

## MantlePulse

- [Project documentation](https://docs.google.com/document/d/1lonpRPzaB4rAxknLVCO1afqfxgTsESjYELRBYGYsjTw/edit)
- The first-person write-up describes Python processing of Mantle Explorer data, engineered behavioural signals, Groq LLaMA prompts, Flask, and HTML/JavaScript.
- The three verdict labels are documented product outputs. They do not verify a wallet owner's emotional state.
- No measured reduction in losses, increase in retention, or improvement in trading outcomes is established by the document.

## Contribution attribution

First-person contribution descriptions follow the supplied ownership context and source descriptions. They do not claim sole authorship, commissioned brand relationships, or production adoption. Confirm the wording if collaborators handled any of the described work.
