---
title: "What I Am Running on My Homelab"
date: "January 27, 2024"
---
**Updated on 12 Feb 2024**

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/rack.png" width="480" height="100"/>

This is a new server that i bought 8 months ago, before that i was using HP Compaq SFF PC :) 

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/old-server.png" width="480" height="100"/>

## Hardware

- Dell R720XD Server Rack <br/>
- 32 x Intel(R) Xeon(R) CPU E5-2650 v2 @ 2.60GHz (2 Sockets) <br/>
- 126GB DDR3 Memory   <br/>
- 240x2GB SSD (Boot Drive) <br/>
- 4x2TB SAS (Primary Storage) <br/>
- 500x2GB HDD (Backup NAS) <br/>
- BRCM 10G/GbE 2+2P 57800 rNDC (Integrated NIC) <br/>
- 750wx2 Power Supplies <br/>
- Dell PERC H710 Mini into IT Mode (For ZFS) <br/>
- TP-Link Ac1200 Mbps ArcherA6 Router <br/>
- TP-Link LS105G Gigabit Switch <br/>

I had Dell PERC H710 Mini RAID Card installed in my server which dosnt support IT mode, so i had to flash it into IT mode using custom firmware. 

## Architecture

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/homelab-diagram.png" width="1280" height="720"/>

## Hypervisor - Proxmox 8.2

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/pve.png" width="1280" height="720"/>

I am using Proxmox 8.2 Type-1 Hyervisor with ZFS it is free and easy to use, i have been using proxmox from last 2 years and my experience is pretty good.

## What services am I running ?

### K3S Cluster

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/alphak3s.png" width="1280" height="720"/>

A six node K3S HA cluster (v1.30.5+k3s1) with two master nodes and four worker nodes, embeded etcd, traefik as ingress controller, metallb and there is one external nginx server acting as a loadbalancer for both master nodes which is running on one of the virtual machine where docker is installed 


### MetalLB <br>
Kubernetes doesn’t natively support network load balancers (Services of type LoadBalancer) for bare-metal clusters. Cloud service providers like AWS, DigitalOcean, Azure, and GCP offer network load balancers (like ELB on AWS), but in a bare-metal setup, services of type LoadBalancer will remain in the "pending" state indefinitely. To overcome this, I use MetalLB, a load balancer designed specifically for bare-metal Kubernetes clusters. MetalLB operates at Layer 2 or Layer 3 and allows Kubernetes services of type "LoadBalancer" to function without the need for a cloud provider's managed load balancing service. It directly takes an IP from our router, and this IP appears as the external IP on the service. From there, I can easily point my Cloudflare Tunnels to that IP, and the service is exposed and secured, all without needing a cloud-based load balancer.

### Selfhosted Gitlab Runners<br>
Running self-hosted GitLab Runners to handle my CI/CD workflows. By using self-hosted runners, I gain full control over the execution environment, which allows for faster build times and eliminates reliance on shared runners. I deployed these runners within my K3s cluster, leveraging Helm charts for easy management and scalability. This setup ensures a more efficient and customizable environment for my development pipeline, with the ability to fine-tune configurations to meet my specific needs.

### Argocd<br>

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/argo-apps.png" width="1280" height="720"/>

I use ArgoCD as my primary GitOps tool to automate the deployment of my self-hosted applications. Some of my personal applications are on GitLab, and their repositories are directly connected to ArgoCD. While I still manually sync the deployments for now, I am in the process of fully automating the workflow using webhooks and Argo Image Updater. Additionally, I'm planning to convert all my deployments into Helm charts and maintain a single repository to manage all my K3s deployment configurations efficiently. This approach will streamline updates, reduce manual intervention, and provide a more scalable and organized setup for my home lab.

### Traefik with Cloudflare Tunnels and Wildcard DNS entries<br>
I’m using **Traefik** as the ingress controller for my K3s cluster, and with the help of Cloudflare Tunnels and wildcard DNS entries, I’m able to expose any service over a subdomain. Thanks to Cloudflare Tunnels, I don’t have to worry about maintaining any CLI issuers or SSL certificates within the cluster—Cloudflare handles the TLS termination for me. Additionally, everything exposed to the internet is secured with MFA, which is an inbuilt feature of Cloudflare Tunnels. I mainly use two types of subdomain schemas: **wildcard-lab.domain.com and wildcard.domain.com**, allowing me to easily manage and route traffic to different services based on the subdomain. This setup gives me a secure and scalable way to expose services while minimizing manual configuration.

**wildcard-lab.domain.com** --> This is a secured subdomain range which need MFA verification to access
**wildcard.domain.com** --> This subdomain schema is publicaly accessible but it also has some sort of security like ddos protection and anti bot verification

### TrueNAS Core<br>

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/nas.png" width="1280" height="720"/>

This server is primarily used as a backup server for Proxmox VM backups, but it also has two storage pools **SMB and NFS** which are utilized as the K3s storage class. Previously, I was using **Longhorn**, but it was too resource-heavy, and the I/O delay was impacting server performance. So, I switched to this simpler and more efficient solution. Currently, the server has two physical hard drives, each **500GB**, which are directly passed through to the VM in a MIRROR configuration. This setup ensures that both drives contain the same data, so in case of a failure, I can simply replace the failed drive with a new one without any data loss.

### Databases and RabbitMQ<br>
Currently, I’m running **PostgreSQL, MongoDB, Redis, and InfluxDB** in Docker containers, but in the future, I plan to migrate most of these databases into my K3s cluster for better scalability and management. Additionally, I’m running containerized **RabbitMQ** as a message broker or queue manager, which is being used in one of my IaaS projects that I’m currently working on. This setup helps streamline communication between different components of the project, and moving the databases to K3s will further optimize my infrastructure in the long run.

### Focalboard something like Jira Board<br>

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/focal.png" width="1280" height="720"/>

Focalboard is an open-source, self-hosted alternative to platforms like Jira, Notion, and Asana. I typically use it as my task management board—whether I’m working on personal projects or anything else, I can easily create tasks and organize them. It gives me that project manager vibe, which is pretty cool! It’s simple, yet effective for keeping track of all my tasks and progress, and the self-hosted aspect fits perfectly into my home lab setup. It’s definitely a useful tool for staying on top of things.

### Cloudflare Tunnels<br>
I’m using two Cloudflare tunnels across different networks in my home lab setup. The first tunnel is set up in my primary home LAN, and the second one is in a pfSense VLAN where external users' virtual machines (VMs) are deployed. These VMs are isolated and can only access the internet, with inter-VLAN communication disabled. Before switching to pfSense, I was using Proxmox SDN, but I ran into limitations with that setup, so I transitioned to pfSense. Interestingly, I am now utilizing both pfSense as a virtual firewall and Proxmox SDN, which operates as an additional layer above pfSense. This combination gives me enhanced control over the network and firewall configurations.

### Pfsense Firewall<br>

<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/pfsense.png" width="1280" height="720"/>

I’m using a software-based firewall installed on top of a virtual machine (VM), which has three network interface cards (NICs). The first NIC is the WAN interface, connected directly to our main LAN (192.168.0.0/24) via the router, providing internet connectivity. The second NIC is the LAN interface, serving as the local virtual LAN network for pfSense. The third NIC is split into two virtual interfaces, each tagged for a specific VLAN, handling the VLAN where my private VMs run, ensuring network isolation and specific routing for them. This setup is part of one of my projects, ConfigCloud, which I’ll explain in another blog post. The hardware I’m using has only one NIC with two 10GbE ports and two empty SFP slots, but for now, I’m utilizing just one of the 10GbE ports. However, in the future, I plan to fill those SFP slots to expand my network capabilities.


## Monitoring 

### Dozzle 
<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/dozzle.png" width="1280" height="720"/>

I have three Docker host virtual machines where I'm running Dozzle and the Dozzle agent, an open-source and lightweight logging tool. I run the Dozzle master on one of my VMs, while the other Docker hosts are connected via the agent URL. Dozzle supports multiple remote host connections, allowing me to view the logs of all containers running on different hosts on a single page. This setup simplifies log monitoring across multiple machines, providing an efficient way to track and manage container logs in my environment. 

### Prometheus, Grafana and Loki stack
<img alt="1" src="https://raw.githubusercontent.com/x64nik/blog/refs/heads/main/public/images/dash.png" width="1280" height="720"/>

I’m also using Grafana along with the Proxmox PVE exporter, InfluxDB, and Prometheus. Currently, I'm using the default Grafana dashboard, but I plan to customize it later. Additionally, I have the Elasticsearch, Fluentbit, and Kibana stack running on my K3s cluster. While it's a bit incomplete at the moment, I'm also running the Prometheus operator, node exporter, and other monitoring tools. At present, I have two Grafana instances—one running on a Docker host and another on K3s—but in the future, I plan to consolidate everything and use only one instance. This setup gives me comprehensive monitoring and logging across my infrastructure.


## Future Plans
At the moment, I don't have any GPUs running in my homelab apart from my workstation PC, which means I can't run any AI/ML workloads. However, I’m planning to build a new machine with consumer-grade hardware, which will be my first GPU-enabled setup. This will allow me to experiment with GPU-related tasks and dive into AI/ML workloads. Alongside that, I’m also planning to upgrade my storage, moving from SAS drives to SSDs for faster performance. Additionally, I’ll be upgrading my network infrastructure by getting a 10GbE switch with SFP, which will significantly increase my network bandwidth and improve overall performance for my homelab. This upgrade will be a huge step forward in optimizing both compute and storage resources.

## Conclusion
My homelab has evolved into a powerful and flexible environment that allows me to experiment with a wide range of technologies, from cloud-native tools and Kubernetes to containerization, networking etc. With a mix of DIY solutions and open-source tools like Traefik, MetalLB, Cloudflare Tunnels, and more, I’ve been able to build a robust infrastructure that supports both personal and professional projects. As I continue to grow and upgrade my homelab—adding GPU-enabled machines, SSD storage, and faster networking—I’m excited for the new possibilities and optimizations that lie ahead. 

This journey has not only been about building a home lab but also about learning, experimenting, and growing my skills in a hands-on, real-world setting. I look forward to sharing more about my progress and future improvements in upcoming posts. 

I hope this blog post inspires you to start building your own homelab. Whether you're a beginner or looking to enhance your skills, setting up a homelab allows you to experiment with various technologies and gain hands-on experience. Start small, and as you learn and grow, you can gradually expand and upgrade your setup. It’s a great way to dive deeper into tech, build a flexible environment, and have fun along the way. Happy building! :)




