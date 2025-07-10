"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronDown, Play } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

export default function CourseDetailsSection() {
  const [openModules, setOpenModules] = useState<{ [key: string]: boolean }>({})

  const toggleModule = (moduleId: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleId]: !prev[moduleId],
    }))
  }

  return (
    <div className="mx-auto p-6 flex flex-col gap-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Cybersecurity And Artificial Intelligence</h1>

        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="text-orange-600 text-sm font-medium">Course is pending approval</span>
        </div>

        <p className="text-gray-600 text-sm">Created by Segun Lawal on May 14, 2025</p>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="inline-flex h-auto p-0 bg-transparent mb-8 gap-0">
          <TabsTrigger
            value="details"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600 px-6 py-3 font-medium mr-2 last:mr-0"
          >
            Course Details
          </TabsTrigger>
          <TabsTrigger
            value="modules"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600 px-6 py-3 font-medium mr-2 last:mr-0"
          >
            Course Modules
          </TabsTrigger>
          <TabsTrigger
            value="author"
            className="data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:bg-gray-200 data-[state=inactive]:text-gray-600 px-6 py-3 font-medium mr-2 last:mr-0"
          >
            About Author
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Course Details</h2>

            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="outline" className="border-gray-300 text-gray-700 bg-white">
                Beginner level course
              </Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700 bg-white">
                15+ hours
              </Badge>
              <Badge variant="outline" className="border-gray-300 text-gray-700 bg-white">
                Hands-on
              </Badge>
            </div>

            <div className="mb-8">
              <p className="text-gray-700 leading-relaxed mb-6">
                Foundational Guide to Cybersecurity Architecture is designed to provide learners with a solid
                understanding of the principles and practices involved in designing secure information systems. This
                course delves into the role of a security architect, exploring key concepts such as threat modeling,
                risk assessment, and the integration of security frameworks within enterprise environments. Through a
                combination of theoretical knowledge and practical applications, participants will learn how to develop
                and implement robust cybersecurity architectures that align with organizational goals and compliance
                requirements.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Learning Objectives</h3>
              <div className="space-y-2">
                <p className="text-gray-700">At the end of this course, participants will be able to:</p>
                <ul className="space-y-2 ml-4">
                  <li className="text-gray-700">
                    • Understand Core Security Architecture Concepts: Grasp the fundamental principles that underpin
                    effective cybersecurity architectures, including confidentiality, integrity, and availability (CIA
                    triad).
                  </li>
                  <li className="text-gray-700">
                    • Perform Threat Modeling and Risk Assessments: Utilize methodologies like STRIDE, DREAD, and OCTAVE
                    to identify potential threats and assess associated risks within information systems.
                  </li>
                  <li className="text-gray-700">
                    • Integrate Security Frameworks: Learn how to apply enterprise architecture frameworks such as
                    TOGAF, Zachman, and SABSA to align security strategies with business objectives.
                  </li>
                  <li className="text-gray-700">
                    • Design Secure Systems: Develop the ability to design security architectures that encompass
                    network, application, and data security considerations.
                  </li>
                  <li className="text-gray-700">
                    • Implement Security Controls: Understand how to select and implement appropriate security controls
                    to mitigate identified risks effectively.
                  </li>
                  <li className="text-gray-700">
                    • Ensure Compliance and Governance: Gain insights into aligning security architectures with
                    regulatory requirements and organizational governance policies.
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification</h3>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="modules" className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Modules</h2>

            <div className="space-y-0 p-3 border rounded-lg">
              <Collapsible>
                <CollapsibleTrigger
                  className="flex items-center justify-between w-full py-4 hover:bg-gray-50 border-b border-gray-200"
                  onClick={() => toggleModule("module1")}
                >
                  <div className="flex items-center gap-3">
                    {openModules["module1"] ? (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-600" />
                    )}
                    <span className="font-medium text-gray-900">
                      Module 1: Introduction to Cybersecurity Architecture
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>5 Lessons</span>
                    <span>1 hour</span>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="px-4 pb-4">
                  <div className="space-y-3 ml-7">
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">1. Understanding Security Architecture Fundamentals</span>
                      </div>
                      <span className="text-sm text-gray-500">20min</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">2. The CIA Triad and Security Principles</span>
                      </div>
                      <span className="text-sm text-gray-500">15min</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">3. Roles and Responsibilities in Cybersecurity</span>
                      </div>
                      <span className="text-sm text-gray-500">12min</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">4. Common Threats and Vulnerabilities</span>
                      </div>
                      <span className="text-sm text-gray-500">18min</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">5. Endpoint Management and Monitoring Tools</span>
                      </div>
                      <span className="text-sm text-gray-500">25min</span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <Play className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">6. Module 1 quiz</span>
                      </div>
                      <span className="text-sm text-gray-500">20min</span>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 hover:bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">
                      Module 2: Identity and Access Management (IAM) and Endpoint Security
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>5 Lessons</span>
                    <span>1 hour</span>
                  </div>
                </CollapsibleTrigger>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 hover:bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Module 3: Network, Application, and Data Security</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>5 Lessons</span>
                    <span>1 hour</span>
                  </div>
                </CollapsibleTrigger>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 hover:bg-gray-50 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Module 4: Detection and Response</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>5 Lessons</span>
                    <span>1 hour</span>
                  </div>
                </CollapsibleTrigger>
              </Collapsible>

              <Collapsible>
                <CollapsibleTrigger className="flex items-center justify-between w-full py-4 hover:bg-gray-50 border-gray-200">
                  <div className="flex items-center gap-3">
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-900">Module 5: Final Project and Course Wrap-Up</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>5 Lessons</span>
                    <span>1 hour</span>
                  </div>
                </CollapsibleTrigger>
              </Collapsible>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                Reject Course
              </Button>
              <Button className="bg-green-500 hover:bg-green-600">Approve Course</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="author" className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Instructor</h2>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                <img
                  src="/placeholder.svg?height=64&width=64"
                  alt="Adebowale Adekola"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-500 mb-1">Adebowale Adekola</h3>
                <p className="text-gray-600 text-sm mb-1">Talent Acquisition Expert</p>
                <p className="text-gray-600 text-sm">adekola@gmail.com</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed mb-8">
              Adekola has over a decade of industry experience in the creation of courses to gain practical knowledge.
              He has worked with renowned industry influencers, tech companies, and start-ups, ensuring seamless and
              engaging user-centered courses.
            </p>

            <div className="flex gap-3">
              <Button variant="destructive" className="bg-red-500 hover:bg-red-600">
                Reject Course
              </Button>
              <Button className="bg-green-500 hover:bg-green-600">Approve Course</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
