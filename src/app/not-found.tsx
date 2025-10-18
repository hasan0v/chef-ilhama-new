'use client';

import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChefHat, Home, Phone, Search, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
        <div className="flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            {/* 404 Animation */}
            <div className="mb-8">
              <div className="relative">
                <div className="text-8xl md:text-9xl font-bold text-red-200 select-none">
                  404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <ChefHat className="h-20 w-20 md:h-24 md:w-24 text-red-500 animate-bounce" />
                </div>
              </div>
            </div>

            {/* Error Message */}
            <Card className="mb-8 shadow-xl border-0">
              <CardContent className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Səhifə Tapılmadı
                </h1>
                <p className="text-xl text-gray-600 mb-6">
                  Axtardığınız səhifə mövcud deyil və ya köçürülüb. 
                  Amma narahat olmayın - ən dadlı reseptlər və professional aşpaz xidməti hələ də buradayıq!
                </p>
                
                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Məşhur Səhifələr:</h3>
                    <div className="space-y-2">
                      <Link 
                        href="/xidmetler" 
                        className="block text-left p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center">
                          <ChefHat className="h-5 w-5 text-red-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-red-600">
                              Aşpaz Xidməti
                            </div>
                            <div className="text-sm text-gray-500">
                              Professional katerinq və şəxsi aşpaz
                            </div>
                          </div>
                        </div>
                      </Link>
                      
                      <Link 
                        href="/reseptler" 
                        className="block text-left p-3 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center">
                          <Search className="h-5 w-5 text-orange-600 mr-3" />
                          <div>
                            <div className="font-medium text-gray-900 group-hover:text-orange-600">
                              Azərbaycan Reseptləri
                            </div>
                            <div className="text-sm text-gray-500">
                              Ənənəvi və müasir reseptlər
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Dərhal Əlaqə:</h3>
                    <a 
                      href="https://wa.me/994103794577?text=Salam%20Chef%20İlhamə,%20aşpaz%20xidməti%20haqqında%20məlumat%20almaq%20istəyirəm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-left p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-green-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-green-600">
                            WhatsApp Əlaqə
                          </div>
                          <div className="text-sm text-gray-500">
                            +994 10 379 45 77
                          </div>
                        </div>
                      </div>
                    </a>
                    
                    <Link 
                      href="/elaqe" 
                      className="block text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group"
                    >
                      <div className="flex items-center">
                        <Home className="h-5 w-5 text-blue-600 mr-3" />
                        <div>
                          <div className="font-medium text-gray-900 group-hover:text-blue-600">
                            Əlaqə Səhifəsi
                          </div>
                          <div className="text-sm text-gray-500">
                            Tam əlaqə məlumatları
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Ana Səhifə
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 hover:border-red-600 hover:text-red-600 px-8 py-4 text-lg rounded-full transition-all duration-300"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Geri Qayıt
              </Button>
            </div>

            {/* Fun Message */}
            <div className="mt-12 p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
              <p className="text-gray-600 text-lg">
                🍽️ <strong>Chef İlhamə məsləhəti:</strong> Səhifə tapılmadı, amma dadlı yemək hazırlamaq üçün həmişə reseptlərimiz var! 
                Yaxud professional aşpaz xidməti üçün bizimlə əlaqə saxlayın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}