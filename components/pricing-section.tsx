import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic plan",
    price: "$19",
    period: "/mo",
    yearlyPrice: "or $199 yearly",
    features: ["Feature text goes here", "Feature text goes here", "Feature text goes here", "Feature text goes here"],
  },
  {
    name: "Business plan",
    price: "$29",
    period: "/mo",
    yearlyPrice: "or $299 yearly",
    features: [
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
    ],
  },
  {
    name: "Enterprise plan",
    price: "$49",
    period: "/mo",
    yearlyPrice: "or $499 yearly",
    features: [
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
      "Feature text goes here",
    ],
  },
]

export function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-green-600 mb-2">Pricing plan</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Tagline</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card key={plan.name} className="border-gray-200 bg-white">
              <CardHeader>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{plan.name}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.yearlyPrice}</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold mb-4 text-gray-900">Includes:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-black hover:bg-green-700 text-white">Get started</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
