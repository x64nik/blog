"use client"
import { HelpCircle, CheckCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getServices, type Service, type ServicesResponse } from "@/app/actions/getServices"
import { useEffect, useState } from "react";

interface StatusItemProps {
  title: string;
  status: Service["status"];
  info: Service["info"];
  showHelp?: boolean;
}


function CustomCheckCircle() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7" fill="#28A745" stroke="#28A745" strokeWidth="2" />
        <path d="M5 8L7 10L11 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function CustomRedCross() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7" fill="#D73A49" stroke="#D73A49" strokeWidth="2" />
        <path d="M5 5L11 11M5 11L11 5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

function CustomYellowWarning() {
    return (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8" cy="8" r="7" fill="#DBAB09" stroke="#DBAB09" strokeWidth="2" />
        <path d="M8 4V9" stroke="black" strokeWidth="2" strokeLinecap="round" />
        <circle cx="8" cy="12" r="1" fill="black" />
      </svg>
    )
  }

function StatusItem({ title, info, status, showHelp = true }: StatusItemProps) {
  return (
    <div className="flex items-center w-full">
      {status === "operational" && <CustomCheckCircle />}
      {status === "warning" && <CustomYellowWarning />}
      {status === "issue" && <CustomRedCross />}
      <span className="text-sm text-gray-200 break-words ml-2">{title}</span>
      {showHelp && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-3 w-3 text-gray-400 ml-2 flex-shrink-0" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-xs">{info}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
}

export default function HomelabStatus() {
    const [error, setError] = useState<string | null>(null)
    const [servicesData, setServicesData] = useState<ServicesResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchServices = async () => {
          try {
            const data = await getServices()
            if (data && Array.isArray(data.services)) {
              setServicesData(data)
              setError(null)
            } else {
              throw new Error("Invalid data structure received from API")
            }
          } catch (err) {
            setError("Failed to fetch services. Please try again later.")
            console.error("Error fetching services:", err)
          } finally {
            setIsLoading(false)
          }
        }
    
        fetchServices()
    
        const intervalId = setInterval(fetchServices, 5000)
    
        return () => clearInterval(intervalId)
      }, [])

    // if (isLoading) {
    //     return <div className="text-white">Loading services...</div>
    // }

    return (
        <div className="max-w-4xl mx-auto py-14">
        <h2 className="text-xl text-center text-white font-semibold mb-8">Homelab Status</h2>
        <div className="text-gray-400 text-sm mt-2 mb-8 text-center">
          {servicesData?.errorMessage}
        </div>
        <div className="justify-center">
            <div className="w-full max-w-4xl">
                {isLoading ? (
                <div className="flex justify-center items-center mb-8">
                    <div className="w-4 h-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                ) : servicesData && servicesData.services && servicesData.services.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                        {servicesData.services.map((service) => (
                            <StatusItem
                                key={service.title}
                                title={service.title}
                                status={service.status}
                                info={service.info}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-300 mb-8">
                        No services available at the moment.
                    </div>
                )}
            </div>
            
            <div className="text-gray-400 text-sm mt-2 text-center">
            Last updated: {servicesData ? new Date(servicesData.timestamp).toLocaleString() : "N/A"}
            </div>
        </div>
        </div>
    );
}
