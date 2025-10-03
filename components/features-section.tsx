import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

const features = [
  {
    title: "Team Work",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    benefits: ["Benefit one of this feature", "Benefit two of this feature", "Benefit three of this feature"],
  },
  {
    title: "KPI Management",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    benefits: ["Benefit one of this feature", "Benefit two of this feature", "Benefit three of this feature"],
  },
  {
    title: "Bug & Issues Management",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
    benefits: ["Benefit one of this feature", "Benefit two of this feature", "Benefit three of this feature"],
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Product Features</h2>
        </div>
        <div className="space-y-8 max-w-5xl mx-auto">
          {features.map((feature) => (
            <Card key={feature.title} className="overflow-hidden border-gray-200 bg-white">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-start">
                  <div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                  <div className="space-y-3">
                    {feature.benefits.map((benefit) => (
                      <div key={benefit} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-green-600 flex-shrink-0">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-sm text-gray-700">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
