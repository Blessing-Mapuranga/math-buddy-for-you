import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, TrendingUp, CheckCircle2, Target } from "lucide-react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

interface Stats {
  success: boolean;
  total_questions: number;
  total_answers: number;
  correct_answers: number;
  accuracy: number;
}

export const StatsSection: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get<Stats>(`${API_BASE}/stats`);
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000); // Refresh every 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600">
            <Target className="w-4 h-4" />
            Total Questions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total_questions || 0}</div>
          <p className="text-xs text-gray-500">Generated from PDFs</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600">
            <TrendingUp className="w-4 h-4" />
            Attempted
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats?.total_answers || 0}</div>
          <p className="text-xs text-gray-500">Questions answered</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600">
            <CheckCircle2 className="w-4 h-4" />
            Correct
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats?.correct_answers || 0}
          </div>
          <p className="text-xs text-gray-500">Correct answers</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2 text-gray-600">
            📊 Accuracy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {stats?.accuracy || 0}%
          </div>
          <p className="text-xs text-gray-500">Performance rate</p>
        </CardContent>
      </Card>
    </div>
  );
};
