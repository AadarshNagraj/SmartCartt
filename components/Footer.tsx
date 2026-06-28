import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Phone, Mail } from "lucide-react";
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="bg-white border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        
        {/* Newsletter & Trust Banner */}
        <div className="bg-secondary rounded-3xl p-8 md:p-12 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Join the SmartCart Family</h3>
            <p className="text-muted-foreground">Subscribe for exclusive offers, early access to sales, and premium tech tips delivered directly to your inbox.</p>
          </div>
          <form className="w-full md:w-auto flex gap-2 sm:max-w-md">
            <Input type="email" placeholder="Email Address" className="h-12 bg-background border-transparent" required />
            <Button type="submit" size="lg" className="h-12 px-8 rounded-xl font-semibold">Subscribe</Button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <span className="font-extrabold text-2xl tracking-tighter text-foreground">
                SmartCart<span className="text-primary">.</span>
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm leading-relaxed">
              India&apos;s premier destination for curated lifestyle essentials, smart tech, and modern fashion. Elevating your daily experience with uncompromising quality.
            </p>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary" />
                <p>Level 4, Cyber City<br/>Gurugram, Haryana 122002<br/>India</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary" />
                <p>+91 1800 123 4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary" />
                <p>support@smartcart.in</p>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-6">Shop by Category</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/categories/electronics" className="hover:text-primary transition-colors">Smart Electronics</Link></li>
              <li><Link href="/categories/wearables" className="hover:text-primary transition-colors">Wearable Tech</Link></li>
              <li><Link href="/categories/home" className="hover:text-primary transition-colors">Home & Living</Link></li>
              <li><Link href="/categories/fashion" className="hover:text-primary transition-colors">Premium Fashion</Link></li>
              <li><Link href="/categories/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-6">Customer Care</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/contact" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/track-order" className="hover:text-primary transition-colors">Track Your Order</Link></li>
              <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="/returns" className="hover:text-primary transition-colors">Returns & Refunds</Link></li>
              <li><Link href="/faq" className="hover:text-primary transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-foreground mb-6">About SmartCart</h4>
            <ul className="space-y-4 text-sm font-medium text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/sustainability" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-border mb-8" />
        
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-primary transition-colors"><FaFacebook className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><FaInstagram className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><FaXTwitter className="h-5 w-5" /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><FaYoutube className="h-5 w-5" /></Link>
          </div>
          
          <p>&copy; {new Date().getFullYear()} SmartCart India. All rights reserved.</p>
          
          <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all">
            {/* Payment Icons placeholers using text/divs for robust rendering */}
            <div className="px-2 py-1 border rounded bg-secondary text-xs font-bold">UPI</div>
            <div className="px-2 py-1 border rounded bg-secondary text-xs font-bold">Visa</div>
            <div className="px-2 py-1 border rounded bg-secondary text-xs font-bold">MasterCard</div>
            <div className="px-2 py-1 border rounded bg-secondary text-xs font-bold">RuPay</div>
            <div className="px-2 py-1 border rounded bg-secondary text-xs font-bold">COD</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
