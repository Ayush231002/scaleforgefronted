import LayoutWrapper from '../layout/LayoutWrapper';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Building2, Users, Target, Zap, Shield, Globe, Cpu, Cloud, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const enterpriseClients = [
    "IBM", "Wipro", "Capgemini", "HCL", "Pfizer", "Lloyds Banking Group", "Expedia Group"
  ];

  const coreCapabilities = [
    {
      category: "Managed IT Services",
      icon: <Cpu className="w-6 h-6" />,
      services: [
        "Annual Maintenance Contracts (AMC)",
        "PAN India Onsite IT Support", 
        "Remote Helpdesk & User Support",
        "Server & Network Management",
        "IT Asset Lifecycle Management",
        "Dedicated / Resident IT Engineers"
      ]
    },
    {
      category: "Cloud & DevOps Consulting",
      icon: <Cloud className="w-6 h-6" />,
      services: [
        "Cloud Adoption & Migration",
        "DevOps Implementation",
        "CI/CD & Automation",
        "Infrastructure as Code",
        "SRE, Monitoring & Observability"
      ],
      note: "Delivered through our specialized division – Scaleforge Consulting"
    }
  ];

  const differentiators = [
    {
      title: "Centralized Service Delivery",
      description: "SLA-driven model ensuring consistency across locations",
      icon: <Target className="w-5 h-5" />
    },
    {
      title: "Integrated Support",
      description: "Remote helpdesk combined with PAN India onsite service",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "Standardized Processes",
      description: "Person-independent, scalable service operations",
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: "Single Point of Contact",
      description: "Faster resolution with predictable service experience",
      icon: <Zap className="w-5 h-5" />
    }
  ];

  const timeline = [
    {
      year: "Pre-2026",
      title: "Foundation Years",
      description: "18+ years of industry experience delivering IT infrastructure support under 'Entire IT Solution' brand"
    },
    {
      year: "2026",
      title: "Elvora Global Incorporated",
      description: "Structured incorporation with vision to build process-driven technology services organization"
    },
    {
      year: "Present",
      title: "Enterprise Excellence",
      description: "Bringing enterprise-grade delivery standards from global enterprise experience to every engagement"
    }
  ];

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 text-white tracking-wide">
            About <span className="text-[#00B3C6]">ElvoraGlobal</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            End-to-end IT infrastructure, managed services and cloud operations company building reliable, secure and scalable technology environments.
          </p>
        </div>

        {/* shadcn Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
            <TabsTrigger value="approach">Approach</TabsTrigger>
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Overview Tab Content */}
        <TabsContent value="overview" className="animate-fade-in">
            
            {/* Who We Are Card */}
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-white/10 my-2">
              <CardHeader className="pb-4">
                <CardTitle className="text-3xl md:text-4xl text-white">Who We Are</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-300 leading-relaxed">
                  Elvora Global Pvt. Ltd. serves as a single, accountable technology partner for organizations looking to simplify IT operations, reduce downtime and enable long-term digital growth.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  We serve as a single, accountable technology partner for organizations looking to simplify IT operations, reduce downtime and enable long-term digital growth.
                </p>
              </CardContent>
            </Card>

            {/* Enterprise Experience Card */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-3xl md:text-4xl text-white text-center">Enterprise Experience</CardTitle>
                <CardDescription className="text-gray-300 text-center text-lg">
                  Our leadership brings real-world experience from global enterprises including:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-center gap-3">
                  {enterpriseClients.map((client, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/10 text-white hover:bg-white/20 px-4 py-2">
                      {client}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Our Journey</h2>
              {timeline.map((item, index) => (
                <Card key={index} className="bg-white/5 border-white/10">
                  <CardContent className="pt-6">
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <Badge variant="default" className="bg-[#00B3C6] text-white px-4 py-2 rounded-lg font-bold min-w-fit">
                        {item.year}
                      </Badge>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-gray-300">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
        </TabsContent>

        {/* Capabilities Tab Content */}
        <TabsContent value="capabilities" className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Our Core <span className="text-[#00B3C6]">Capabilities</span>
            </h2>
            
            {coreCapabilities.map((capability, index) => (
              <Card key={index} className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#00B3C6]/20 rounded-2xl flex items-center justify-center text-[#00B3C6]">
                      {capability.icon}
                    </div>
                    <CardTitle className="text-2xl md:text-3xl text-white">{capability.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {capability.services.map((service, serviceIndex) => (
                      <div key={serviceIndex} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#00B3C6] rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300">{service}</p>
                      </div>
                    ))}
                  </div>
                  {capability.note && (
                    <p className="text-[#00B3C6] text-sm italic">{capability.note}</p>
                  )}
                </CardContent>
              </Card>
            ))}

            {/* What Makes Us Different */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
                What Makes Us <span className="text-[#00B3C6]">Different</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {differentiators.map((item, index) => (
                  <Card key={index} className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-[#00B3C6]/20 rounded-xl flex items-center justify-center text-[#00B3C6] flex-shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-300">{item.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
        </TabsContent>

        {/* Approach Tab Content */}
        <TabsContent value="approach" className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              Our <span className="text-[#00B3C6]">Approach</span>
            </h2>
            
            <Card className="bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-white/10">
              <CardHeader>
                <CardDescription className="text-gray-300 text-center text-xl">
                  We believe IT should be:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { title: "Proactive", subtitle: "not reactive", icon: <Zap className="w-6 h-6" /> },
                    { title: "Standardized", subtitle: "not person-dependent", icon: <Shield className="w-6 h-6" /> },
                    { title: "Scalable", subtitle: "not location-bound", icon: <Globe className="w-6 h-6" /> },
                    { title: "Business-aligned", subtitle: "not just technology-focused", icon: <Target className="w-6 h-6" /> }
                  ].map((item, index) => (
                    <Card key={index} className="text-center bg-white/5 border-white/10">
                      <CardContent className="pt-6">
                        <div className="w-16 h-16 bg-[#00B3C6]/20 rounded-2xl flex items-center justify-center text-[#00B3C6] mx-auto mb-4">
                          {item.icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm">{item.subtitle}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-[#00B3C6]/10 to-[#00B3C6]/10 border-[#00B3C6]/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    To become a trusted nationwide technology partner for organizations seeking reliable managed services and modern cloud transformation.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    To simplify and standardize IT operations for growing businesses through integrated infrastructure, support and cloud solutions — delivered with accountability, consistency and speed.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Building for Future */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl text-white">Building for the Future</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 leading-relaxed">
                  Along with our services portfolio, Elvora Global is also investing in building technology platforms for industry-specific challenges, including digital healthcare solutions, as part of our long-term vision to become a product-led and services-enabled technology organization.
                </p>
              </CardContent>
            </Card>
        </TabsContent>

        {/* Leadership Tab Content */}
        <TabsContent value="leadership" className="animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
              <span className="text-[#00B3C6]">Leadership</span>
            </h2>
            
            <Card className="bg-gradient-to-br from-white/5 to-white/10 border-white/10">
              <CardContent className="pt-12 pb-12">
                <div className="max-w-4xl mx-auto text-center">
                  <div className="w-32 h-32 bg-[#00B3C6]/20 rounded-2xl flex items-center justify-center text-[#00B3C6] mx-auto mb-8">
                    <Users className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
                    Technology-Driven Leadership
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
                    Elvora Global is driven by a technology professional with 18+ years of experience in IT infrastructure, cloud platforms and DevOps transformation, having worked across startups, enterprises and multi-location business environments.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-[#00B3C6] mb-2">18+</div>
                        <div className="text-gray-300">Years Experience</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-[#00B3C6] mb-2">IT Infra</div>
                        <div className="text-gray-300">Expertise</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="pt-6 text-center">
                        <div className="text-3xl font-bold text-[#00B3C6] mb-2">DevOps</div>
                        <div className="text-gray-300">Transformation</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
        </TabsContent>

        {/* CTA Section */}
        <Card className="mt-16 bg-gradient-to-r from-[#00B3C6]/10 to-[#00B3C6]/10 border-[#00B3C6]/30">
          <CardContent className="pt-12 pb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Transform Your IT Operations?
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Partner with Elvora Global for reliable, scalable, and secure technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => window.location.href = "/services"}
                className="bg-gradient-to-r from-[#00B3C6] to-[#00B3C6] hover:from-[#00B3C6] hover:to-[#00B3C6]"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.location.href = "/contact"}
                className="border-[#00B3C6]/20 text-white hover:bg-[#00B3C6]/10"
              >
                Get in Touch
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutWrapper>
  );
}
