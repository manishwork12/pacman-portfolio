import { useState } from 'react';
import { X, Github, Linkedin, Globe, Code2, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface ContactSectionProps {
  onClose: () => void;
}

const socialLinks = [
  { name: 'GitHub', icon: Github, url: '#', color: 'hover:text-white' },
  { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-400' },
  { name: 'Portfolio', icon: Globe, url: '#', color: 'hover:text-green-400' },
  { name: 'LeetCode', icon: Code2, url: '#', color: 'hover:text-yellow-400' },
];

export const ContactSection = ({ onClose }: ContactSectionProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    collaboration: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would connect to FastAPI backend later
    console.log('Form submitted:', formData);
    toast({
      title: "Message saved! 📬",
      description: "Connect backend to send messages. Data logged to console.",
    });
    setFormData({ name: '', email: '', subject: '', message: '', collaboration: false });
  };

  return (
    <div className="fixed inset-0 bg-gray-900/95 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-gray-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-auto border-4 border-orange-400 shadow-[0_0_30px_rgba(251,146,60,0.3)]">
        <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-orange-400">📬 Contact Me</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </Button>
        </div>
        
        <div className="p-6">
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-gray-700 rounded-full text-gray-400 transition-all hover:scale-110 ${link.color}`}
              >
                <link.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="name" className="text-gray-300">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject" className="text-gray-300">Regarding</Label>
              <Input
                id="subject"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Job opportunity, Collaboration, etc."
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-gray-300">Message</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your message..."
                className="bg-gray-700 border-gray-600 text-white min-h-[100px]"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="collaboration"
                checked={formData.collaboration}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, collaboration: checked as boolean })
                }
              />
              <Label htmlFor="collaboration" className="text-gray-400 text-sm cursor-pointer">
                I'm interested in collaboration opportunities
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-400 text-white font-bold py-3"
            >
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
