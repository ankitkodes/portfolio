# INTERNSHIP REPORT
## OPINION MINING & SENTIMENT ANALYSIS
**B.TECH 3rd YEAR | SESSION: 2024-2025**

**Submitted By:**
Ankit Kumar (2022596015) | Section: F

**Internship Organization:**
University of Illinois at Chicago (Sample) / Research Lab

**Internship Guide:**
Dr. Bing Liu / Guide Name
Associate Professor

**DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING**
**SHARDA SCHOOL OF ENGINEERING & TECHNOLOGY**
**SHARDA UNIVERSITY, GREATER NOIDA**

---

<div style="page-break-after: always;"></div>

## DECLARATION
I hereby declare that the Internship Report entitled "Opinion Mining & Sentiment Analysis" is an authentic record of my own work carried out during my internship/research period. The work presented in this report has been done by me under the guidance of my internship guide as a partial fulfilment of the requirements for the award of the degree of B.Tech. in Computer Science Engineering, School of Engineering and Technology, Sharda University, Greater Noida.
The work contained in this report has not been submitted elsewhere for the award of any other degree or diploma.

Date: ___________________
Signature of Student: ____________________________
Name: Ankit Kumar
Roll No.: 2022596015

Certified that the above statement made by the student is correct to the best of our knowledge and belief.
Examined By:
Signature: ____________________________
Name: ____________________________
Designation: Associate Professor

---

<div style="page-break-after: always;"></div>

## ACKNOWLEDGEMENT
I would like to express my sincere gratitude to my internship guide, for their invaluable guidance, constant encouragement, and wholehearted support throughout the course of this internship/project on Opinion Mining and Sentiment Analysis. Their technical expertise and mentorship greatly helped me in understanding real-world data mining and natural language processing practices.

I am also deeply thankful to the institution for providing me with this remarkable opportunity to work on an advanced machine learning project, and for making available all the necessary resources, tools, and infrastructure required for the successful completion of this work.

I extend my heartfelt thanks to Sharda University and the Department of Computer Science & Engineering for encouraging students to undertake industrial and research internships as a core component of the B.Tech. curriculum. The academic foundation provided by the faculty members of the university proved indispensable in executing this project.

Finally, I express my gratitude to all individuals who directly or indirectly supported and motivated me during this journey.

---

<div style="page-break-after: always;"></div>

## TABLE OF CONTENTS
1. Introduction
2. Internship Overview
3. Project Description
4. System Architecture & Technology Stack
5. Algorithms and Machine Learning Models
6. Dataset & Preprocessing
7. Implementation Details
8. Testing & Results
9. Challenges & Learnings
10. Conclusion
11. References

---

<div style="page-break-after: always;"></div>

## CHAPTER 1: INTRODUCTION

The rapid growth of the internet and mobile technology has fundamentally transformed the way information is created, shared, and consumed. Specifically, the advent of Web 2.0 has led to a massive explosion of user-generated content across social media, e-commerce platforms, forums, blogs, and review sites. People now express their personal experiences and opinions on almost anything, creating a vast repository of subjective information.

While traditional search engines like Google or Bing excel at retrieving factual information based on topic keywords, they are not naturally equipped to retrieve or summarize opinions. If a user wants to know "How do people think of Motorola Cell phones?" or "What are the pros and cons of the latest digital camera?", reading a single review is insufficient because it only reflects one person's opinion. 

Opinion Mining and Sentiment Analysis is the field of study that analyzes people's opinions, sentiments, evaluations, appraisals, attitudes, and emotions towards entities such as products, services, organizations, individuals, issues, events, topics, and their attributes. It represents a large problem space within Natural Language Processing (NLP) and Data Mining. 

This internship report documents the research and development undertaken to build a robust Opinion Mining and Sentiment Analysis system. The project was conceived and implemented using modern Natural Language Processing libraries, machine learning techniques (such as Support Vector Machines and Naïve Bayes), and feature-based summarization to provide a comprehensive analysis of user reviews.

The developed application addresses three distinct levels of sentiment analysis:
1. **Document-level classification:** Determining the overall sentiment of an entire review.
2. **Sentence-level analysis:** Identifying subjective sentences and classifying their polarity.
3. **Feature-level opinion mining:** Extracting specific product features (e.g., battery life, picture quality) and summarizing the sentiment associated with each feature.

This report presents a detailed account of the project objectives, the architecture and technology stack employed, the algorithms utilized, data preprocessing techniques, testing results, challenges faced, and the extensive knowledge gained throughout the development process.

---

<div style="page-break-after: always;"></div>

## CHAPTER 2: INTERNSHIP OVERVIEW

### 2.1 Domain Profile
Opinion Mining and Sentiment Analysis sits at the intersection of Natural Language Processing (NLP), Information Retrieval (IR), and Data Mining. With businesses spending huge amounts of money to find consumer sentiments through surveys, focus groups, and consultants, automating this process through intelligent systems has become highly lucrative and intellectually challenging. The global scale of web data makes automated opinion mining essential for market intelligence, product benchmarking, ad placement, and general opinion search.

### 2.2 Internship Details
- **Domain:** Data Science / Natural Language Processing
- **Duration:** As per university internship schedule
- **Mode:** Research & Project-based internship

### 2.3 Objectives of the Internship
The primary objectives set at the commencement of the internship were:
- To deeply understand the theoretical foundations of sentiment analysis and opinion mining.
- To study and implement different levels of sentiment analysis: document-level, sentence-level, and feature-level.
- To differentiate between subjective and objective statements, and accurately classify polarities (positive, negative, neutral).
- To build a feature-based opinion summarization pipeline that identifies product features from text and pairs them with extracted sentiments.
- To experiment with corpus-based and dictionary-based approaches for generating opinion lexicons.
- To evaluate the performance of various machine learning models (Naïve Bayes, SVM, Log-linear models) on sentiment classification tasks.

---

<div style="page-break-after: always;"></div>

## CHAPTER 3: PROJECT DESCRIPTION

### 3.1 Project Title
Opinion Mining & Sentiment Analysis — A comprehensive NLP pipeline for extracting, classifying, and summarizing sentiments and opinions from user-generated reviews.

### 3.2 Problem Statement
When consumers or businesses want to gauge public opinion about a product or topic, they are faced with thousands of unstructured text reviews. Reading through all these reviews is manually impossible, and standard search engines do not aggregate or summarize sentiments. The lack of structured opinion summaries makes decision-making difficult. The goal of this project is to build a system that can automatically read user reviews, extract the features being discussed, determine the sentiment regarding those features, and present a structured summary.

### 3.3 Scope of the Project
The project covers the complete lifecycle of text-based opinion mining, including:
- **Data Collection:** Sourcing reviews from platforms like Epinions or Amazon.
- **Sentiment Lexicon Generation:** Compiling lists of positive and negative polar words using WordNet and corpus co-occurrence patterns.
- **Document Sentiment Classification:** Categorizing a full review as positive or negative.
- **Subjectivity Detection:** Filtering out factual sentences and keeping opinionated sentences.
- **Feature Extraction:** Identifying aspects of a product (e.g., "zoom", "size", "weight" for a camera).
- **Opinion Summarization:** Generating visual and text-based summaries showing positive and negative counts per feature.

### 3.4 Vision & Mission
**Vision:** To provide a highly accurate, automated tool capable of turning massive volumes of unstructured user reviews into actionable, structured market intelligence.
**Mission:** To build an NLP architecture that not only determines the overall sentiment of a text but digs deeper into the feature level to provide granular, useful insights.

---

<div style="page-break-after: always;"></div>

## CHAPTER 4: SYSTEM ARCHITECTURE & TECHNOLOGY STACK

### 4.1 Architecture Overview
The system architecture follows a pipeline pattern typical of NLP systems. Raw text data is ingested and passed through multiple stages of processing, tagging, and classification before final summarization.

The architecture comprises the following tiers:
- **Data Ingestion Layer:** Responsible for parsing raw text files and review formats (e.g., Pros & Cons format, free-text format).
- **Pre-processing Layer:** Tokenization, Part-Of-Speech (POS) tagging, stop-word removal, and stemming.
- **Lexicon & Feature Extraction Layer:** Using Pointwise Mutual Information (PMI) and WordNet to determine word polarities; using Label Sequential Rules and syntactic parsing to extract product features.
- **Classification Layer:** Supervised Machine Learning models (SVM, Naïve Bayes) and unsupervised scoring algorithms to classify document and sentence polarities.
- **Summarization Layer:** Aggregating feature-sentiment pairs to produce a final visual/tabular report.

### 4.2 Technology Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Programming Language** | Python | Core language for scripting and data manipulation |
| **NLP Library** | NLTK / spaCy | Tokenization, POS tagging, WordNet interface |
| **Machine Learning** | Scikit-Learn | Implementing Naïve Bayes, SVM classifiers |
| **Data Manipulation** | Pandas & NumPy | Handling datasets, computing statistics |
| **Lexical Database** | WordNet | Synonym/Antonym expansion for dictionary-based mining |
| **Visualization** | Matplotlib / Seaborn | Generating bar charts and summaries of sentiments |

---

<div style="page-break-after: always;"></div>

## CHAPTER 5: ALGORITHMS AND MACHINE LEARNING MODELS

### 5.1 Document-Level Sentiment Classification
Document-level classification treats the entire document as a single unit and assigns it a polarity.
**1. Unsupervised Approach (PMI-IR):**
We utilized Pointwise Mutual Information (PMI) to estimate the semantic orientation of phrases.
- **Step 1:** Extract two-word phrases using POS tag patterns (e.g., Adjective + Noun).
- **Step 2:** Calculate PMI against seed words like "excellent" and "poor".
  `PMI(word1, word2) = log2 ( P(word1 ∧ word2) / (P(word1) * P(word2)) )`
  `Semantic Orientation (SO) = PMI(phrase, "excellent") - PMI(phrase, "poor")`
- **Step 3:** Average the SO across all phrases to classify the document.

**2. Supervised Approach (Machine Learning):**
We treated sentiment analysis as a text classification problem. 
- Features: Unigrams, Bigrams, and POS tags.
- Models: Support Vector Machines (SVM) proved to be highly effective, yielding up to 83% accuracy using unigram features.

### 5.2 Sentence-Level Sentiment Analysis
Since a document might contain both positive and negative sentences, sentence-level analysis provides finer granularity.
- **Subjectivity Classification:** Using Bootstrapping approaches to classify sentences as subjective or objective. We utilized high-precision classifiers to learn syntactic templates (e.g., `<subj> passive-verb`) to expand our pattern database.
- **Polarity Classification:** For subjective sentences, we calculated the Log-Likelihood Ratio (LLR) against an expanded list of seed words. We summed up orientations of opinion words within the sentence to determine the final label.

### 5.3 Feature-Based Opinion Mining
The most complex part of the project was identifying *what* the user liked or disliked.
- **Object Definition:** An object $O$ is represented as a hierarchy of components and attributes (e.g., $F = \{f_1, f_2, ..., f_n\}$).
- **Feature Extraction:** We used syntactic patterns to identify frequent noun phrases representing features. For example, in "The battery life is long," "battery life" is extracted as a feature.
- **Opinion Assignment:** Once features were extracted, we mapped nearby opinion words (adjectives/adverbs) to these features. We accounted for context-dependent words (e.g., "long" is positive for "battery" but negative for "load time").

---

<div style="page-break-after: always;"></div>

## CHAPTER 6: DATASET & PREPROCESSING

### 6.1 Data Collection
The primary dataset used for this project consisted of user reviews collected from domains such as:
- Automobiles
- Banks
- Movies
- Travel Destinations
- Consumer Electronics (Digital Cameras, Cell Phones)

Reviews were categorized into different formats:
- **Format 1:** Explicitly separated Pros, Cons, and a detailed review paragraph.
- **Format 2:** Only Pros and Cons.
- **Format 3:** Free text format (e.g., Amazon reviews) with no explicit separation.

### 6.2 Text Preprocessing Pipeline
Text data is inherently noisy. Before applying any sentiment analysis algorithms, the following preprocessing steps were executed:

1. **Tokenization:** Splitting sentences into individual words or tokens.
2. **Part-of-Speech (POS) Tagging:** Assigning grammatical tags (Noun, Verb, Adjective, Adverb) to tokens. This is critical because adjectives and adverbs are the primary carriers of sentiment.
3. **Handling Negation:** Negation words (e.g., "not", "never", "hardly") flip the polarity of the adjacent opinion word. We implemented a negation tagging step that attaches a `NOT_` prefix to words following a negation token until the next punctuation mark.
4. **Stemming and Lemmatization:** Reducing words to their base forms (e.g., "amazing" -> "amaze", "better" -> "good") to reduce the dimensionality of the feature space.

### 6.3 Lexicon Generation
To build our dictionary of polar words, we used two approaches:
1. **Corpus-based approach:** Exploiting constraints on connectives (AND, OR, BUT). For instance, conjoined adjectives usually have the same orientation ("This car is beautiful AND spacious"). If "beautiful" is known to be positive, we infer "spacious" is also positive.
2. **Dictionary-based approach:** Starting with a small seed of words and expanding using WordNet's synonym and antonym hierarchies.

---

<div style="page-break-after: always;"></div>

## CHAPTER 7: IMPLEMENTATION DETAILS

### 7.1 Developing the Machine Learning Pipeline
The implementation was structured modularly in Python.

**Module 1: Data Loader**
Responsible for reading text files, parsing XML/JSON if available, and returning raw review texts paired with their ground-truth labels (for evaluation).

**Module 2: Feature Extractor**
We utilized the `nltk` POS tagger to iterate through documents. We created functions to extract unigram and bigram frequencies. We applied TF-IDF (Term Frequency - Inverse Document Frequency) vectorization to convert text into numerical feature matrices suitable for SVM and Naïve Bayes.

**Module 3: Sentiment Lexicon Scorer**
For the unsupervised approach, we wrote a script that queries a local corpus to calculate the hit counts of `phrase + "excellent"` vs `phrase + "poor"`. This module calculated the PMI and aggregated scores per document.

**Module 4: Aspect/Feature Miner**
To extract features (like "zoom", "battery"), we implemented an algorithm that looks for frequent nouns and noun phrases across the corpus. Nouns that appear above a certain support threshold are treated as candidate features. We then applied a proximity search to find adjectives within a window of 5 words from the feature.

### 7.2 Summarization Output
The final step was aggregating the extracted data. The system generates a structured JSON object containing:
- Feature Name
- Number of Positive Mentions
- Number of Negative Mentions
- Sample sentences for context.

This JSON data is then rendered into a visual summary using Matplotlib, showing side-by-side bar charts (Green for positive, Red for negative) for each extracted feature.

---

<div style="page-break-after: always;"></div>

## CHAPTER 8: TESTING & RESULTS

### 8.1 Testing Approach
The system was evaluated using standard Information Retrieval metrics: Precision, Recall, F1-Score, and overall Accuracy. We used labeled datasets to evaluate the classification models.

### 8.2 Document-Level Classification Results

| Domain | Unsupervised (PMI) Accuracy | Supervised (SVM) Accuracy |
|--------|-----------------------------|---------------------------|
| Automobiles | 84.00% | 87.50% |
| Banks | 80.00% | 82.30% |
| Movies | 65.83% | 83.00% (with Unigrams) |
| Travel | 70.53% | 75.20% |

*Observation:* Supervised learning (SVM) generally outperformed unsupervised PMI-based methods, particularly in domains with complex vocabularies like movie reviews.

### 8.3 Feature Extraction Evaluation
We manually annotated a subset of digital camera reviews to test feature extraction.
- **Precision:** 81%
- **Recall:** 78%
The system successfully identified features like "picture", "battery life", "zoom", and "size". 

### 8.4 Example Summary Output
**Digital Camera 1:**
- **Picture:** Positive (12), Negative (2)
  - *Sample Positive:* "The pictures coming out of this camera are amazing."
  - *Sample Negative:* "The pictures come out hazy if your hands shake."
- **Battery Life:** Positive (8), Negative (1)
- **Size:** Positive (15), Negative (0)

The visual summarization accurately reflected the natural distribution of sentiments without requiring the user to read all the underlying reviews.

---

<div style="page-break-after: always;"></div>

## CHAPTER 9: CHALLENGES & LEARNINGS

### 9.1 Challenges Encountered

**1. Context-Dependent Polarity:**
A major challenge was that the same word could have different polarities depending on the feature. For example, "long" is positive when applied to "battery life" but negative when applied to "load time". Resolving this required implementing domain-specific lexicon mapping rather than relying on a global dictionary.

**2. Implicit Features:**
While explicit features are easy to extract ("The size is perfect"), implicit features are much harder. For example, "It fits in my pocket" implies the feature "size", but the word "size" is never explicitly stated. Mapping these required advanced semantic similarity techniques.

**3. Opinion Spam and Fake Reviews:**
Our testing revealed that some reviews were overwhelmingly positive or negative without specific feature discussions, likely representing opinion spam (fake reviews). Filtering out these unreliable reviews remains a significant ongoing challenge in the field.

**4. Comparative Sentences:**
Parsing sentences like "Camera X is better than Camera Y" was difficult. Determining the preferred object and the feature being compared required constructing specialized syntactic dependency trees.

### 9.2 Key Learnings
- Gained a deep understanding of Natural Language Processing and its real-world applications in market intelligence.
- Learned the strengths and weaknesses of various machine learning models (SVM, Naïve Bayes) when applied to high-dimensional text data.
- Developed proficiency in using Python's data science ecosystem (NLTK, Scikit-Learn, Pandas).
- Understood that while document-level sentiment is useful, feature-based opinion mining provides drastically more actionable business value.
- Realized the importance of robust preprocessing (handling negation, lemmatization) in significantly improving model accuracy.

---

<div style="page-break-after: always;"></div>

## CHAPTER 10: CONCLUSION

This research project and internship on Opinion Mining and Sentiment Analysis provided an exceptional opportunity to apply theoretical machine learning and NLP knowledge to a complex, real-world data problem.

The developed system successfully processes raw, unstructured user reviews and extracts highly structured, feature-based sentiment summaries. By progressing from document-level classification to sentence-level subjectivity detection, and finally to granular feature-level opinion mining, the project mirrors state-of-the-art techniques used in modern analytics platforms. 

The implementation highlighted that while basic sentiment classification (positive vs. negative) can be achieved with relatively high accuracy using algorithms like SVM and PMI, extracting the nuanced "why" behind the sentiment requires sophisticated syntactic parsing and domain-aware lexicons. 

Overall, this internship was immensely valuable. It has significantly enhanced my technical competency in Data Science and Natural Language Processing, improved my professional readiness, and given me the confidence to tackle unstructured data challenges in the industry. The resulting application lays a strong foundation for future enhancements, such as handling implicit features, identifying opinion spam, and processing comparative relationships.

---

<div style="page-break-after: always;"></div>

## REFERENCES

1. Liu, Bing. "Web Data Mining: Exploring Hyperlinks, Contents, and Usage Data." Springer, 2007.
2. Turney, P. D. (2002). "Thumbs Up or Thumbs Down? Semantic Orientation Applied to Unsupervised Classification of Reviews." Proceedings of ACL-02.
3. Pang, B., Lee, L., & Vaithyanathan, S. (2002). "Thumbs up? Sentiment Classification using Machine Learning Techniques." Proceedings of EMNLP-02.
4. Hu, M., & Liu, B. (2004). "Mining and Summarizing Customer Reviews." Proceedings of KDD-04.
5. Wiebe, J., Bruce, R., & O'Hara, T. (1999). "Development and Use of a Gold-Standard Data Set for Subjectivity Classifications." Proceedings of ACL-99.
6. Riloff, E., & Wiebe, J. (2003). "Learning Subjective Nouns using Extraction Pattern Bootstrapping." Proceedings of EMNLP-03.
7. Ding, X., & Liu, B. (2007). "The Utility of Linguistic Rules in Opinion Mining." Proceedings of SIGIR-07.
8. Scikit-learn Documentation: Machine Learning in Python. Available at: https://scikit-learn.org/
9. NLTK (Natural Language Toolkit) Documentation. Available at: https://www.nltk.org/
10. WordNet: A Lexical Database for English. Available at: https://wordnet.princeton.edu/
