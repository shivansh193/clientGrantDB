"use client";
import React from 'react';

export default function IndustryDropdown({onSelectIndustry}: any) {
    const industries = [
        "Sector Agnostic",
        "Technology",
        "Innovation",
        "Life Sciences",
        "Biotechnology",
        "Manufacturing",
        "Services",
        "Agro and Allied Activities",
        "Micro, Small and Medium Enterprises (MSMEs)",
        "Software Development",
        "Internet Services",
        "Telecommunications",
        "Electronics",
        "Research and Development (R&D)",
        "Pharmaceuticals",
        "Semiconductors",
        "Hardware",
        "Hospitality",
        "Garmenting",
        "Aviation",
        "Clean Energy",
        "Climate Change",
        "Environmental Protection",
        "Entrepreneurship",
        "Agribusiness",
        "Startups",
        "Cloud Computing",
        "Artificial Intelligence (AI)",
        "Internet of Things (IoT)",
        "Information Technology (IT)",
        "Social Impact",
        "Education",
        "Biopharmaceuticals",
        "Medical Devices",
        "Incubation",
        "Aerospace",
        "Satellite Communication",
        "Health",
        "Energy",
        "Higher Education",
        "Seed Funding",
        "Pre-seed Funding",
        "Series A Funding",
        "Small Businesses",
        "Vendors",
        "Shopkeepers",
        "Artisans",
        "Service Sector",
        "Agriculture",
        "Food Processing",
        "Retail",
        "HealthTech",
        "EdTech",
        "E-commerce",
        "FinTech",
        "SaaS",
        "Machine Learning",
        "Data Analytics",
        "Cybersecurity",
        "Robotics",
        "Artificial Intelligence",
        "Digital Health",
        "Non-profit",
        "For-profit",
        "Government",
        "Commerce",
        "Academia",
        "Defence",
        "STEM (Science, Technology, Engineering, Mathematics)",
        "Tourism",
        "Travel",
        "Media and Entertainment",
        "Transportation"
    ];
    const handleChange=(event: any)=>{
        onSelectIndustry(event.target.value)
    }

    return (
        <select>
            {industries.map((industry, index) => (
                <option key={index} value={industry}>{industry}</option>
            ))}
        </select>
    );
}
