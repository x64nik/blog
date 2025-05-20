"use server"

import { cache } from "react"

export type ServiceStatus = "operational" | "warning" | "issue"

export interface Service {
  title: string
  status: ServiceStatus
  info: string
}

export interface ServicesResponse {
  services: Service[]
  timestamp: number,
  info?: string,
  errorMessage?: string
}

export const getServices = cache(async (): Promise<ServicesResponse> => {
  try {
    // Simulating an API call to a mock endpoint
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/lab/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": `${process.env.NEXT_PUBLIC_X_API_KEY}`
        // Add any necessary authentication headers here
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch services")
    }

    const data: Service[] = await response.json()
    return {
      services: data,
      timestamp: Date.now(),
    }
  } catch (error) {
    console.error("Error fetching services:", error)

    // Fallback data in case of an error
    return {
      services: [
        { "title": "Hypervisor", "status": "issue", "info": "Virtualization platform for managing multiple VMs." },
        { "title": "Nginx Gateway", "status": "issue", "info": "Reverse proxy and load balancer for web traffic." },
        { "title": "HAProxy", "status": "issue", "info": "High-performance TCP/HTTP load balancer and proxy server." },
        { "title": "pfSense", "status": "issue", "info": "Open-source firewall and router software." },
        { "title": "Cloudflare Tunnels", "status": "issue", "info": "Secure tunneling service to connect local services to Cloudflare." },
        { "title": "K3S Server", "status": "issue", "info": "Lightweight Kubernetes for production workloads in IoT and edge environments." },
        { "title": "Custom Runners", "status": "issue", "info": "Self-hosted runners for CI/CD workflows in GitHub Actions." },
        { "title": "TrueNAS", "status": "issue", "info": "FreeNAS-based storage server for managing and sharing files." }
    ],
      timestamp: Date.now(),
      errorMessage: "It looks like my server is currently offline, which might be due to me being in the office, a power outage, or an internet issue. I usually keep the server offline while I’m at the office to save on electricity costs, and I also power it down during the nighttime.",
    }
  }
})