"use client";

import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useToast} from "@/hooks/use-toast";
import {useDebounce} from "@/hooks/use-debounce";
import {deobfuscateCode} from "@/ai/flows/deobfuscate-code";
import {analyzeCodeSecurity} from "@/ai/flows/analyze-code-security";
import {explainCode} from "@/ai/flows/explain-code-functionality"; // Import explainCode
import {Download, ShieldAlert, Brain, RefreshCw} from "lucide-react";
import Link from "next/link";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [inputCode, setInputCode] = useState("");
  const [outputCode, setOutputCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [securityAnalysis, setSecurityAnalysis] = useState("");
  const [obfuscationTypes, setObfuscationTypes] = useState("");
  const [codeComplexity, setCodeComplexity] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const {toast} = useToast();

  const debouncedInputCode = useDebounce(inputCode, 500);

  const handleDeobfuscate = async () => {
    setIsProcessing(true);
    try {
      const result = await deobfuscateCode({obfuscatedCode: inputCode});
      setOutputCode(result.deobfuscatedCode);
    } catch (error: any) {
      console.error("Error deobfuscating code:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to deobfuscate code.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    const getExplanation = async () => {
      if (debouncedInputCode) {
        try {
          const explanationResult = await explainCode({code: debouncedInputCode});
          setExplanation(explanationResult.explanation);
        } catch (error: any) {
          console.error("Error explaining code:", error);
          toast({
            title: "Explanation Error",
            description: error.message || "Failed to explain code.",
            variant: "destructive",
          });
        }
      }
    };

    getExplanation();
  }, [debouncedInputCode]);

  const handleSecurityAnalysis = async () => {
    setIsProcessing(true);
    try {
      const securityResult = await analyzeCodeSecurity({code: inputCode});
      setSecurityAnalysis(securityResult.analysis);
      setObfuscationTypes(securityResult.obfuscationTypes);
      setCodeComplexity(securityResult.codeComplexity);

      toast({
        title: "Security Analysis Complete",
        description: "Security and complexity analysis has been performed.",
      });
    } catch (error: any) {
      console.error("Error analyzing code security:", error);
      toast({
        title: "Security Analysis Error",
        description: error.message || "Failed to analyze code security.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([outputCode], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "deobfuscated_code.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="p-4 border-b border-border">
        <h1 className="text-2xl font-bold text-primary">ClarityCode</h1>
        <p className="text-muted-foreground">Deobfuscate and understand your code.</p>
      </header>
      <main className="flex flex-grow p-4 space-x-4">
        <div className="w-1/2 flex flex-col space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Input Code</CardTitle>
              <CardDescription>Enter the obfuscated code you want to deobfuscate and analyze.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter obfuscated code here..."
                className="bg-secondary font-mono min-h-[200px]"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={handleDeobfuscate} disabled={isProcessing} variant="primary" className="w-full">
                  Deobfuscate
                </Button>
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardHeader>
              <CardTitle>Security Analysis</CardTitle>
              <CardDescription>Analyze security vulnerabilities, obfuscation types, and code complexity.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <Button
                onClick={handleSecurityAnalysis}
                disabled={isProcessing}
                variant="destructive"
                className="w-full"
              >
                Analyze Code Security
                <ShieldAlert className="ml-2 h-4 w-4"/>
              </Button>

              <Card className="mt-4">
                <CardHeader>
                  <CardTitle>Security Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    placeholder="Security analysis will appear here..."
                    className="bg-secondary font-mono min-h-[100px]"
                    value={securityAnalysis}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Obfuscation Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    placeholder="Obfuscation types will appear here..."
                    className="bg-secondary font-mono min-h-[100px]"
                    value={obfuscationTypes}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Code Complexity Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    readOnly
                    placeholder="Code complexity analysis will appear here..."
                    className="bg-secondary font-mono min-h-[100px]"
                    value={codeComplexity}
                  />
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        <div className="w-1/2 flex flex-col space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Output Code</CardTitle>
              <CardDescription>Deobfuscated code generated by AI.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col space-y-4">
              <Textarea
                readOnly
                placeholder="Deobfuscated code will appear here..."
                className="bg-secondary font-mono min-h-[400px]"
                value={outputCode}
              />
              <div className="flex justify-end">
                <Button onClick={handleDownload} disabled={!outputCode || isProcessing} variant="secondary">
                  Download
                  <Download className="ml-2 h-4 w-4"/>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Explanation</CardTitle>
              <CardDescription>Explanation of the code functionality.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                readOnly
                placeholder="Explanation will appear here..."
                className="bg-secondary font-mono min-h-[200px]"
                value={explanation}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
