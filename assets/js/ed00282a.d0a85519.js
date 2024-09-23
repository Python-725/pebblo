"use strict";(self.webpackChunkclassic=self.webpackChunkclassic||[]).push([[2805],{2607:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var i=t(4848),a=t(8453);const s={},o="Safe Retriever for LangChain",r={id:"retrieval_chain_semantic_enf",title:"Safe Retriever for LangChain",description:"Semantic Enforcement RAG using PebbloRetrievalQA",source:"@site/versioned_docs/version-0.1.18/retrieval_chain_semantic_enf.md",sourceDirName:".",slug:"/retrieval_chain_semantic_enf",permalink:"/pebblo/0.1.18/retrieval_chain_semantic_enf",draft:!1,unlisted:!1,editUrl:"https://github.com/daxa-ai/pebblo/tree/main/docs/gh_pages/versioned_docs/version-0.1.18/retrieval_chain_semantic_enf.md",tags:[],version:"0.1.18",frontMatter:{}},c={},l=[{value:"Setup",id:"setup",level:2},{value:"Dependencies",id:"dependencies",level:3},{value:"Identity-aware Data Ingestion",id:"identity-aware-data-ingestion",level:3},{value:"Retrieval with Semantic Enforcement",id:"retrieval-with-semantic-enforcement",level:2},{value:"Ask questions",id:"ask-questions",level:2},{value:"Without semantic enforcement",id:"without-semantic-enforcement",level:3},{value:"Deny financial-report topic",id:"deny-financial-report-topic",level:3},{value:"Deny us-bank-account-number entity",id:"deny-us-bank-account-number-entity",level:3}];function d(e){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,a.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"safe-retriever-for-langchain",children:"Safe Retriever for LangChain"}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.em,{children:(0,i.jsx)(n.strong,{children:"Semantic Enforcement RAG using PebbloRetrievalQA"})})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"PebbloRetrievalQA"})," is a Retrieval chain with Identity & Semantic Enforcement for question-answering against a vector database."]}),"\n",(0,i.jsx)(n.p,{children:"This document covers how to retrieve documents with Semantic Enforcement."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Steps:"})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Loading Documents with Semantic metadata:"})," The process starts by loading documents with semantic metadata."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Using supported Vector database"})," ",(0,i.jsx)(n.code,{children:"PebbloRetrievalQA"})," chain requires a Vector database that supports rich metadata filtering capability. Pick one\nfrom the supported Vector database vendor list shown below in this document."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Initializing PebbloRetrievalQA Chain:"}),"  After loading the documents, the PebbloRetrievalQA chain is initialized. This chain uses the retriever (\ncreated from the vector database) and an LLM."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"The 'ask' Function:"}),"  The 'ask' function is used to pose questions to the system. This function accepts a question and an semantic_context as\ninput and returns the answer using the PebbloRetrievalQA chain. The semantic context contains the topics and entities that should be denied within\nthe context used to generate a response."]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.strong,{children:"Posing Questions:"})," Finally, questions are posed to the system. The system retrieves answers based on the semantic metadata in the documents\nand the semantic_context provided in the 'ask' function."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"setup",children:"Setup"}),"\n",(0,i.jsx)(n.h3,{id:"dependencies",children:"Dependencies"}),"\n",(0,i.jsx)(n.p,{children:"The walkthrough requires Langchain, langchain-community, langchain-openai, and a Qdrant client."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"%pip install --upgrade --quiet  langchain langchain-community langchain-openai qdrant_client\n"})}),"\n",(0,i.jsx)(n.h3,{id:"identity-aware-data-ingestion",children:"Identity-aware Data Ingestion"}),"\n",(0,i.jsx)(n.p,{children:"In this scenario, Qdrant is being utilized as a vector database. However, the flexibility of the system allows for the use of any supported vector\ndatabases."}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"PebbloRetrievalQA chain supports the following vector databases:"})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Qdrant"}),"\n",(0,i.jsx)(n.li,{children:"Pinecone"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Load vector database with semantic information in metadata:"})}),"\n",(0,i.jsxs)(n.p,{children:["In this phase, the semantic topics and entities of the original document are captured and stored in the ",(0,i.jsx)(n.code,{children:"pebblo_semantic_topics"}),"\nand ",(0,i.jsx)(n.code,{children:"pebblo_semantic_entities"})," fields respectively within the metadata of\neach chunk in the VectorDB entry."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsxs)(n.em,{children:["It's important to note that to use the PebbloRetrievalQA chain, semantic metadata must always be placed in the ",(0,i.jsx)(n.code,{children:"pebblo_semantic_topics"}),"\nand ",(0,i.jsx)(n.code,{children:"pebblo_semantic_entities"})," fields."]})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from langchain_community.vectorstores.qdrant import Qdrant\nfrom langchain_core.documents import Document\nfrom langchain_openai.embeddings import OpenAIEmbeddings\nfrom langchain_openai.llms import OpenAI\n\nllm = OpenAI()\nembeddings = OpenAIEmbeddings()\ncollection_name = "pebblo-semantic-rag"\n\npage_content = """\n**ACME Corp Financial Report**\n\n**Overview:**\nACME Corp, a leading player in the merger and acquisition industry, presents its financial report for the fiscal year ending December 31, 2020. \nDespite a challenging economic landscape, ACME Corp demonstrated robust performance and strategic growth.\n\n**Financial Highlights:**\nRevenue soared to $50 million, marking a 15% increase from the previous year, driven by successful deal closures and expansion into new markets. \nNet profit reached $12 million, showcasing a healthy margin of 24%.\n\n**Key Metrics:**\nTotal assets surged to $80 million, reflecting a 20% growth, highlighting ACME Corp\'s strong financial position and asset base. \nAdditionally, the company maintained a conservative debt-to-equity ratio of 0.5, ensuring sustainable financial stability.\n\n**Future Outlook:**\nACME Corp remains optimistic about the future, with plans to capitalize on emerging opportunities in the global M&A landscape. \nThe company is committed to delivering value to shareholders while maintaining ethical business practices.\n\n**Bank Account Details:**\nFor inquiries or transactions, please refer to ACME Corp\'s US bank account:\nAccount Number: 123456789012\nBank Name: Fictitious Bank of America\n"""\n\ndocuments = [\n    Document(\n        **{\n            "page_content": page_content,\n            "metadata": {\n                "pebblo_semantic_topics": ["financial-report"],\n                "pebblo_semantic_entities": ["us-bank-account-number"],\n                "page": 0,\n                "source": "https://drive.google.com/file/d/xxxxxxxxxxxxx/view",\n                "title": "ACME Corp Financial Report.pdf",\n            },\n        }\n    )\n]\n\nprint("Loading vectordb...")\n\nvectordb = Qdrant.from_documents(\n    documents,\n    embeddings,\n    location=":memory:",\n    collection_name=collection_name,\n)\n\nprint("Vectordb loaded.")\n'})}),"\n",(0,i.jsx)(n.h2,{id:"retrieval-with-semantic-enforcement",children:"Retrieval with Semantic Enforcement"}),"\n",(0,i.jsxs)(n.p,{children:["The PebbloRetrievalQA chain uses SafeRetrieval to ensure that the snippets used in context are retrieved only from documents that comply with the\nprovided semantic context.\nTo achieve this, the Gen-AI application must provide a semantic context for this retrieval chain.\nThis ",(0,i.jsx)(n.code,{children:"semantic_context"})," should include the topics and entities that should be denied for the user accessing the Gen-AI app."]}),"\n",(0,i.jsxs)(n.p,{children:["Below is a sample code for PebbloRetrievalQA with ",(0,i.jsx)(n.code,{children:"topics_to_deny"})," and ",(0,i.jsx)(n.code,{children:"entities_to_deny"}),". These are passed in ",(0,i.jsx)(n.code,{children:"semantic_context"})," to the chain input."]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'from typing import Optional, List\nfrom langchain_community.chains import PebbloRetrievalQA\nfrom langchain_community.chains.pebblo_retrieval.models import (\n    ChainInput,\n    SemanticContext,\n)\n\n# Initialize PebbloRetrievalQA chain\nqa_chain = PebbloRetrievalQA.from_chain_type(\n    llm=llm,\n    app_name="pebblo-semantic-retriever-rag",\n    owner="Joe Smith",\n    description="Semantic filtering using PebbloSafeLoader, and PebbloRetrievalQA",\n    chain_type="stuff",\n    retriever=vectordb.as_retriever(),\n    verbose=True,\n)\n\n\ndef ask(\n    question: str,\n    topics_to_deny: Optional[List[str]] = None,\n    entities_to_deny: Optional[List[str]] = None,\n):\n    """\n    Ask a question to the PebbloRetrievalQA chain\n    """\n    semantic_context = dict()\n    if topics_to_deny:\n        semantic_context["pebblo_semantic_topics"] = {"deny": topics_to_deny}\n    if entities_to_deny:\n        semantic_context["pebblo_semantic_entities"] = {"deny": entities_to_deny}\n\n    semantic_context_obj = (\n        SemanticContext(**semantic_context) if semantic_context else None\n    )\n    chain_input_obj = ChainInput(query=question, semantic_context=semantic_context_obj)\n    return qa_chain.invoke(chain_input_obj.dict())\n'})}),"\n",(0,i.jsx)(n.h2,{id:"ask-questions",children:"Ask questions"}),"\n",(0,i.jsx)(n.h3,{id:"without-semantic-enforcement",children:"Without semantic enforcement"}),"\n",(0,i.jsx)(n.p,{children:"Since no semantic enforcement is applied, the system should return the answer."}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'topic_to_deny = []\nentities_to_deny = []\nquestion = "Please share the financial performance of ACME Corp for 2020"\nresp = ask(question, topics_to_deny=topic_to_deny, entities_to_deny=entities_to_deny)\nprint(\n    f"Topics to deny: {topic_to_deny}\\nEntities to deny: {entities_to_deny}\\n"\n    f"Question: {question}\\nAnswer: {resp[\'result\']}\\n"\n)\n'})}),"\n",(0,i.jsx)(n.p,{children:"Output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"Topics to deny: []\nEntities to deny: []\nQuestion: Please share the financial performance of ACME Corp for 2020\nAnswer: \nACME Corp had a strong financial performance in 2020, with a 15% increase in revenue to $50 million and a net profit of $12 million, \nindicating a healthy margin of 24%. The company also saw a 20% growth in total assets, reaching $80 million. \nACME Corp maintained a conservative debt-to-equity ratio of 0.5, ensuring financial stability. \nThe company has plans to capitalize on emerging opportunities in the global M&A landscape and is committed to delivering value \nto shareholders while maintaining ethical business practices. \n"})}),"\n",(0,i.jsx)(n.h3,{id:"deny-financial-report-topic",children:"Deny financial-report topic"}),"\n",(0,i.jsx)(n.p,{children:'Data has been ingested with the topics: ["financial-report"].\nTherefore, a app that denies the "financial-report" topic should not receive an answer.'}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'topic_to_deny = ["financial-report"]\nentities_to_deny = []\nquestion = "Please share the financial performance of ACME Corp for 2020"\nresp = ask(question, topics_to_deny=topic_to_deny, entities_to_deny=entities_to_deny)\nprint(\n    f"Topics to deny: {topic_to_deny}\\nEntities to deny: {entities_to_deny}\\n"\n    f"Question: {question}\\nAnswer: {resp[\'result\']}\\n"\n)\n'})}),"\n",(0,i.jsx)(n.p,{children:"Output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"Topics to deny: ['financial-report']\nEntities to deny: []\nQuestion: Please share the financial performance of ACME Corp for 2020\nAnswer:  Unfortunately, I do not have access to that information.\n"})}),"\n",(0,i.jsx)(n.h3,{id:"deny-us-bank-account-number-entity",children:"Deny us-bank-account-number entity"}),"\n",(0,i.jsx)(n.p,{children:'Since the entity "us-bank-account-number" is denied, the system should not return the answer.'}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-python",children:'topic_to_deny = []\nentities_to_deny = ["us-bank-account-number"]\nquestion = "Please share the financial performance of ACME Corp for 2020"\nresp = ask(question, topics_to_deny=topic_to_deny, entities_to_deny=entities_to_deny)\nprint(\n    f"Topics to deny: {topic_to_deny}\\nEntities to deny: {entities_to_deny}\\n"\n    f"Question: {question}\\nAnswer: {resp[\'result\']}\\n"\n)\n'})}),"\n",(0,i.jsx)(n.p,{children:"Output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"Topics to deny: []\nEntities to deny: ['us-bank-account-number']\nQuestion: Please share the financial performance of ACME Corp for 2020\nAnswer:  Unfortunately, I do not have access to that information.\n"})})]})}function h(e={}){const{wrapper:n}={...(0,a.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>r});var i=t(6540);const a={},s=i.createContext(a);function o(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:o(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);