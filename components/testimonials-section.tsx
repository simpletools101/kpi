import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const testimonials = [
  {
    quote: "Been an early user & have not found anything else which comes close to improving our PR workflow.",
    author: "Akshay Katyal",
    role: "Head of Engineering, Backstage",
    initials: "AK",
  },
  {
    quote: "Been an early user & have not found anything else which comes close to improving our PR workflow.",
    author: "Mustak Ahmed",
    role: "Head of Engineering, Backstage",
    initials: "MA",
  },
  {
    quote: "Been an early user & have not found anything else which comes close to improving our PR workflow.",
    author: "Sajid Ahmed",
    role: "Head of Engineering, Backstage",
    initials: "SA",
  },
  {
    quote: "Been an early user & have not found anything else which comes close to improving our PR workflow.",
    author: "Akshay Katyal",
    role: "Head of Engineering, Backstage",
    initials: "AK",
  },
  {
    quote: "Been an early user & have not found anything else which comes close to improving our PR workflow.",
    author: "Mustak Ahmed",
    role: "Head of Engineering, Backstage",
    initials: "MA",
  },
  {
    quote: "Been an early user & have not found anything else which comes close to improving our PR workflow.",
    author: "Sajid Ahmed",
    role: "Head of Engineering, Backstage",
    initials: "SA",
  },
]

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-green-600 mb-2">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Loved By Japanese Companies And African Devs</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-gray-200 bg-white">
              <CardContent className="pt-6">
                <p className="text-gray-600 mb-6 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-green-600 text-white">{testimonial.initials}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{testimonial.author}</p>
                    <p className="text-xs text-gray-600">{testimonial.role}</p>
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
