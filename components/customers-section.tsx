import { Card, CardContent } from "@/components/ui/card"

const customerGroups = [
  {
    title: "Customer group one",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  },
  {
    title: "Customer group two",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  },
  {
    title: "Customer group three",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.",
  },
]

export function CustomersSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-sm  mb-4 text-gray-600 ">Customers</h2>
          <p className="text-5xl font-bold text-black  max-w-2xl mx-auto">
            Short headline about who the product or service is for
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {customerGroups.map((group) => (
            <Card key={group.title} className="border-gray-200 bg-white">
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{group.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{group.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
