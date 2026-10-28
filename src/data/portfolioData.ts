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
  title: "Data Analyst | Data Engineer | ETL Developer",
  eyebrow: "DATA ANALYST · DATA ENGINEER · ETL DEVELOPER",
  tagline: "Building resilient data pipelines, scalable ETL workflows, and intelligent agentic AI systems.",
  summary: "Data Analyst and Data Engineer with 2+ years of experience in web scraping, ETL pipeline development, large-scale data processing, and analytics. Experienced in building data-driven solutions using Python, SQL, PySpark, PostgreSQL, AWS, and Apache Airflow. Additionally, developing expertise in GenAI application development through LLM integration, tool-calling workflows, and agentic AI projects.",
  
  aboutParagraphs: [
    "I am a Data Analyst and Data Engineer with 2+ years of experience specializing in web scraping, robust ETL pipeline development, and batch data processing. My daily work revolves around turning high-volume, unstructured web data into clean, validated, and analytics-ready datasets.",
    "I work extensively across Python, PySpark, PostgreSQL, and AWS S3, orchestrating resilient workflows with Apache Airflow. Alongside core data engineering, I actively explore GenAI engineering—building agentic workflows with LangChain, LangGraph, and local LLMs using Ollama for intelligent tool calling and structured data retrieval."
  ],

  keyHighlights: [
    {
      number: "2+ Years",
      label: "Industry Experience",
      description: "Hands-on data extraction, pipeline automation & analytics"
    },
    {
      number: "6–8M",
      label: "Monthly Records",
      description: "Processed and transformed with PySpark and PostgreSQL"
    },
    {
      number: "25+",
      label: "Scraped Sources",
      description: "Multi-platform automated spiders with monitoring & retry"
    },
    {
      number: "100%",
      label: "Faithful & Verified",
      description: "Real production pipeline architecture & verified credentials"
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
        "Developed and maintained data extraction workflows to collect and process product information from multiple external sources.",
        "Transformed raw data into structured, standardized datasets through data cleaning, validation, and quality checks.",
        "Automated recurring data processing tasks and troubleshot scraping failures and pipeline issues to improve workflow reliability.",
        "Supported database operations and backend development to improve data accessibility and application functionality.",
        "Worked on maintaining data consistency across sources and resolving data-quality issues affecting downstream analytics.",
        "Explored LLM-based product matching to connect natural-language product comparison requests with relevant records in scraped datasets.",
        "Collaborated on ongoing system enhancements, debugging, and performance improvements to support reliable data processing."
      ]
    }
  ],

  projects: [
    {
      id: "ecomedes",
      title: "Ecomedes",
      type: "production",
      context: "Orbio Solutions",
      summary: "Developed scalable batch data pipelines to extract, process, validate, and deliver product data from 25+ external web sources, supporting downstream analytics, reporting, and business intelligence.",
      highlights: [
        "Processed 6–8 million records monthly using Scrapy, PySpark, SQL, and PostgreSQL.",
        "Developed Scrapy spiders to extract product specifications, certifications, and metadata.",
        "Implemented PySpark workflows for data cleaning, transformation, and validation, storing raw data in PostgreSQL.",
        "Delivered processed datasets, product certifications, and images to client AWS S3 buckets for downstream analytics and reporting.",
        "Orchestrated reliable batch pipelines using Apache Airflow with monitoring and retry mechanisms.",
        "Developed Power BI dashboards to analyze product trends, certification status, and key business metrics."
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
      summary: "Developed an AI-powered travel planning assistant using LangGraph and a locally hosted Qwen3:4b model through Ollama. The application uses a tool-calling workflow to generate personalized travel itineraries and integrate external APIs for destination research, weather information, currency conversion, and expense estimation.",
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
