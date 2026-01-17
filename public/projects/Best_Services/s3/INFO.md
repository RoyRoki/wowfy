DevOps Automation Pipeline Dashboard

Description: Self-hosted CI/CD monitoring tool: Real-time pipeline status, auto-deploy triggers, error alerts, GitHub/GitLab integration. Includes performance analytics and rollback UI.
Challenge/Solution: Manual deploys causing downtime → GitHub Actions + monitoring reduced deploy time 80%.
Metrics: 200+ pipelines managed, 99.99% uptime for clients.
Tech: Next.js (dashboard), FastAPI (backend), Prometheus/Grafana (metrics), WebSockets (real-time), Lenis scroll + GSAP (pipeline flow scrub), @react-three/fiber (3D pipeline graph).
Visual Hook: Horizontal scroll velocity animates pipeline stages; cursor glows on failing nodes.