import { PortfolioData } from '../types/portfolio';

/**
 * CENTRAL PORTFOLIO DATA
 * 
 * Edit this file directly to update your portfolio text, links, skills, and projects.
 * All UI components render dynamically from this data structure.
 * 
 * Assets:
 * - Profile photo: stored in `public/images/sooraj-profile.png` (or `.jpg`)
 * - Resume PDF: stored in `public/resume/Sooraj_KK_Resume.pdf`
 */
export const defaultPortfolioData: PortfolioData = {
  name: "Sooraj KK",
  title: "Data Analyst | Data Engineer | GENERATIVE AI",
  eyebrow: "DATA ANALYST · DATA ENGINEER · GENERATIVE AI",
  tagline: "Building scalable data pipelines, robust ETL workflows, and AI-powered data solutions.",
  summary: "Data Professional with 2+ years of experience developing data extraction workflows, ETL pipelines, and data processing solutions using Python, SQL, Scrapy, PySpark, and PostgreSQL. Experienced in processing millions of records monthly, integrating data from multiple external sources, and delivering structured datasets for analytics and business intelligence. Hands-on experience with AWS, Docker, REST API development, and automated data workflows, complemented by independent project experience in Generative AI, LLM integration, tool calling, and agentic AI applications.",
  
  aboutParagraphs: [
    "I'm a data professional with 2+ years of experience in data extraction, ETL development, and data processing, currently working as a Data Analyst while building expertise in Data Engineering.",
    "I work primarily with Python, SQL, Scrapy, PySpark, and PostgreSQL to develop data workflows, automate processing tasks, and integrate data from multiple sources. My experience also includes AWS, Docker, backend API development, and delivering structured datasets for analytics.",
    "Beyond data engineering, I'm interested in Generative AI and agentic systems, exploring how LLMs, tool calling, and intelligent workflows can solve practical problems.",
    "I'm continuously expanding my technical expertise and enjoy solving real-world data challenges through scalable engineering solutions."
  ],

  keyHighlights: [
    {
      number: "2+ Years",
      label: "Industry Experience",
      description: "Hands-on data extraction, pipeline automation & analytics"
    }
  ],

  profilePhotoUrl: "/images/sooraj-profile.png",
  resumeDownloadUrl: "/resume/Sooraj_KK_Resume.pdf",
  resumeFileName: "Sooraj_KK_Resume.pdf",

  social: {
    github: "https://github.com/soorajInsights",
    linkedin: "https://www.linkedin.com/in/sooraj-kk-5073a3270",
    email: "soorajkknmd@gmail.com",
    phone: "8111822012",
    location: "Calicut, Kerala, India"
  },

  skills: [
    {
      id: "programming",
      category: "Programming",
      skills: ["Python", "SQL"]
    },
    {
      id: "data-engineering",
      category: "Data Engineering",
      skills: ["Scrapy", "PySpark", "Apache Airflow", "dbt"]
    },
    {
      id: "analytics-bi",
      category: "Analytics & BI",
      skills: ["Microsoft Power BI", "Exploratory Data Analysis (EDA)"]
    },
    {
      id: "databases-cloud",
      category: "Databases & Cloud",
      skills: ["PostgreSQL", "MySQL", "AWS S3", "AWS EC2"]
    },
    {
      id: "backend-dev",
      category: "Backend Development",
      skills: ["Django REST Framework", "FastAPI", "REST APIs"]
    },
    {
      id: "genai-agentic",
      category: "GenAI & Agentic AI",
      skills: ["LangChain", "LangGraph", "Ollama", "LLM tool calling"]
    },
    {
      id: "devops-version",
      category: "DevOps & Version Control",
      skills: ["Docker", "Git", "GitHub Actions"]
    }
  ],

  experience: [
    {
      id: "orbio-solutions",
      role: "Data Analyst",
      company: "Orbio Solutions Pvt Ltd",
      period: "07/2024 – Present",
      location: "Calicut, India",
      highlights: [
        "Developed and maintained data extraction and ETL workflows to collect, process, and standardize product information from multiple external sources.",
        "Implemented data cleaning, transformation, validation, and quality checks to improve data consistency and reliability for downstream analytics.",
        "Automated recurring data processing tasks and troubleshot web scraping failures and pipeline issues to improve workflow reliability.",
        "Contributed to the development of a retail price intelligence platform for competitor price tracking, historical SKU-level pricing analysis, and cross-platform product comparison.",
        "Developed backend components and REST APIs to support consumer and distributor dashboards, enabling data access across application components.",
        "Supported database operations, backend debugging, and performance optimization to maintain reliable data processing and application functionality.",
        "Investigated and resolved data quality issues across multiple sources to maintain standardized product datasets and support downstream reporting and analytics."
      ]
    }
  ],

  projects: [
    {
      id: "ecomedes",
      title: "Ecomedes",
      type: "production",
      context: "Orbio Solutions",
      summary: "Worked on a large-scale product data processing platform for Ecomedes, developing and maintaining automated data extraction and ETL workflows to collect, process, standardize, and deliver sustainable building product information from multiple external sources. The pipelines handle diverse product specifications, certifications, technical attributes, and associated metadata, transforming raw source data into structured, validated datasets for downstream analytics, reporting, and business intelligence.",
      highlights: [
        "Developed and maintained automated web scraping pipelines using Python and Scrapy to extract product information, specifications, certifications, and metadata from 25+ external sources.",
        "Processed approximately 1–3 million records monthly, handling large volumes of heterogeneous product data.",
        "Implemented PySpark-based data cleaning, transformation, standardization, and validation workflows to improve data consistency and reliability.",
        "Managed structured product datasets using PostgreSQL, supporting downstream data processing and analytics requirements.",
        "Integrated AWS S3 for storing and delivering processed datasets, product certifications, and associated images to client environments.",
        "Supported automated batch processing workflows, troubleshooting extraction failures, data inconsistencies, and pipeline execution issues.",
        "Prepared standardized datasets to support analytics, reporting, and sustainable product information management."
      ],
      tags: ["Scrapy", "Python", "PySpark", "SQL", "PostgreSQL", "AWS S3", "Apache Airflow", "Power BI"]
      // Note: No public repository or live demo link in resume for production client project.
    },
    {
      id: "ottixhow",
      title: "OttixHow — AI Retail Price Intelligence",
      type: "production",
      context: "Orbio Solutions",
      summary: "Developed a retail price intelligence platform to collect competitor product data, track historical SKU-level pricing, and support cross-platform product comparison using web-scraped data and LLM-assisted product identification.",
      highlights: [
        "Developed REST APIs using Django REST Framework to support consumer and distributor dashboard functionality.",
        "Built Scrapy spiders with proxy rotation and automated retry handling to collect product details and pricing data from multiple e-commerce platforms.",
        "Designed PostgreSQL schemas to store product information, multi-currency prices, and historical SKU-level pricing data for competitor analysis.",
        "Explored LLM integration to interpret user product comparison requests and identify matching products in the scraped product database, helping map natural-language queries to relevant product records across platforms.",
        "Containerized data-processing pipelines using Docker and integrated automated checks into GitHub Actions to support code quality and reliability."
      ],
      tags: ["Python", "Scrapy", "Django REST Framework", "PostgreSQL", "LLM Integration", "Docker", "GitHub Actions"]
      // Note: No public repository or live demo link in resume for production client project.
    },
    {
      id: "ai-trip-planner-agent",
      title: "AI Trip Planner Agent",
      type: "independent",
      context: "Independent Technical Project",
      summary: "Developed an AI-powered travel planning assistant using LangGraph, LangChain, and a locally hosted Qwen3:4b model through Ollama. The application uses an agentic workflow with LLM-based reasoning and tool calling to understand user travel requirements, retrieve relevant information from external APIs, and generate personalized travel itineraries. Integrated destination research, weather information, currency conversion, and expense estimation to support informed travel planning, with a FastAPI backend and Streamlit interface.",
      highlights: [
        "Built an agentic workflow using LangGraph and LangChain to orchestrate LLM responses and tool execution.",
        "Integrated Google Places and Tavily Search for destination research, attractions, restaurants, activities, and transportation information.",
        "Integrated OpenWeatherMap for weather information and ExchangeRate-API for currency conversion.",
        "Implemented expense calculation tools for accommodation costs, total trip expenses, and daily budget estimation.",
        "Developed a FastAPI REST API for processing travel-planning queries and returning generated responses.",
        "Built a Streamlit frontend for interactive user input and Markdown-formatted itinerary display.",
        "Configured a local LLM using Ollama (qwen3:4b) to support local inference without relying on a hosted LLM API."
      ],
      tags: ["Python", "LangGraph", "LangChain", "Ollama", "Qwen3:4b", "FastAPI", "Streamlit", "Google Places", "Tavily Search", "OpenWeatherMap", "ExchangeRate-API"],
      repoUrl: "https://github.com/soorajInsights/trip_planner_agent.git"
    }
  ],

  education: [
    {
      id: "calicut-bsc",
      degree: "B.Sc. in Botany",
      institution: "Calicut University",
      period: "07/2016 – 05/2019",
      location: "Kerala, India"
    }
  ],

  certificates: [
    {
      id: "ds-101",
      title: "Data Science 101 (DS0101EN)",
      issuer: "IBM SkillsBuild",
      verifyUrl: "https://courses.cognitiveclass.ai/certificates/ff9cc7c7549b47c2a34c5e521f645619",
      badgeCode: "DS0101EN"
    },
    {
      id: "data-literacy",
      title: "Data Literacy",
      issuer: "IBM SkillsBuild",
      verifyUrl: "https://www.credly.com/badges/19db0f1e-6b35-48c1-8a9e-efa9ffeacde5/public_url"
    },
    {
      id: "ethics-ai",
      title: "Ethics in AI and Data Science (LFS112)",
      issuer: "The Linux Foundation",
      verifyUrl: "https://www.credly.com/badges/3ff7d8b9-3c61-4a33-a710-c14d7056dde8/linked_in_profile",
      badgeCode: "LFS112"
    }
  ]
};
