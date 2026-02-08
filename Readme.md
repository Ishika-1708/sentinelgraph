SentinelGraph: AI Architectural Sentinel
SentinelGraph is an architectural intelligence platform designed to maintain the structural integrity of software repositories. By leveraging the Gemini 3 API, it provides a comprehensive oversight system that visualizes dependency entropy, detects architectural violations, and generates verified refactor blueprints.

Inspiration
The rapid adoption of artificial intelligence in software development has introduced a significant paradox: code is being produced faster than it can be effectively architected. Current AI assistants often operate with a narrow focus, excelling at localized refactoring but remaining unaware of the broader structural implications within a large repository. This global blindness leads to architectural decay and unmanageable technical debt. SentinelGraph was developed to serve as a Global Architect, leveraging advanced reasoning to maintain design intent across the entire development lifecycle.

Features
3D Architecture Graph: An immersive, interactive visualization of the system's semantic clusters and dependency networks.

Thought Stream: A real-time feed of the model's internal reasoning process, exposing the Thought Signatures and planning logic behind architectural decisions.

Architectural Drift Detection: Instant identification of circular dependencies, layer bypasses, and pattern violations using a 2M token context window.

Refactor Blueprints: Strategic, multi-file structural plans designed to resolve technical debt while adhering to senior-level engineering pragmatism.

Validated Execution: Integration with a secured sandbox environment to verify proposed structural changes before they are committed.

Technical Stack
Frontend: Next.js, TypeScript, Tailwind CSS, and Framer Motion.

Visualization: Three.js and React Force Graph 3D.

AI Reasoning: Gemini 3 API (Pro and Flash) via the Google Generative AI SDK.

Backend Support: FastAPI, Celery, and Redis for asynchronous repository analysis.

Repository Structure
The project is organized into modular components and services to ensure scalability:

components/: Contains the 3D GraphView, ThoughtStream feed, and Workspace management logic.

services/: Includes the GeminiService for handling high-reasoning API interactions.

types.ts: Centralized TypeScript definitions for application state and architectural data models.

App.tsx: The core application controller managing the transition from ingestion to analysis.

Installation and Setup
Prerequisites
Node.js (v20.19.0+ or v22.12.0+)

Gemini API Key

Configuration
Clone the repository and navigate to the root directory.

Install the required dependencies:

Bash
npm install
Configure the environment variables in a .env file:

Code snippet
VITE_API_BASE=http://localhost:8000
GEMINI_API_KEY=your_api_key_here
Launch the development server:

Bash
npm run dev
Governance and Ethics
SentinelGraph is built for the Gemini 3 API Developer Competition. It prioritizes data privacy through local metadata stripping and ensures that all AI-driven refactors are human-authorized.
