
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Link, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateShortCode = () => {
    return Math.random().toString(36).substring(2, 8);
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleShorten = async () => {
    if (!originalUrl) {
      toast({
        title: "Error",
        description: "Please enter a URL to shorten",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUrl(originalUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL (including http:// or https://)",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const shortCode = generateShortCode();
      const newShortenedUrl = `https://short.ly/${shortCode}`;
      setShortenedUrl(newShortenedUrl);
      setIsLoading(false);
      
      toast({
        title: "Success!",
        description: "Your URL has been shortened",
      });
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortenedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Short URL copied to clipboard",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">URL Shortener</h1>
          <p className="text-gray-600">Make your long URLs short and easy to share</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Shorten Your URL</CardTitle>
            <CardDescription>Paste your long URL below</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  type="url"
                  placeholder="https://example.com/your-long-url"
                  value={originalUrl}
                  onChange={(e) => setOriginalUrl(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button 
                onClick={handleShorten} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? 'Shortening...' : 'Shorten URL'}
              </Button>
            </div>

            {shortenedUrl && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800 mb-2">Your shortened URL:</p>
                <div className="flex items-center gap-2">
                  <Input 
                    value={shortenedUrl} 
                    readOnly 
                    className="bg-white border-green-300"
                  />
                  <Button 
                    onClick={copyToClipboard}
                    variant="outline"
                    size="sm"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
