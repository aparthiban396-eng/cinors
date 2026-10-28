import React from "react";

export interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface TrustCard {
  title: string;
  icon: React.ReactNode;
  desc: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ShowcaseSpec {
  label: string;
  value: string;
}

export interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  tag: "Commercial" | "Residential" | "Interior";
  image: string;
  gallery?: string[];
  video?: string;
  dimensions?: string;
  description: string;
  specs?: ShowcaseSpec[];
  featured?: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Review {
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}
