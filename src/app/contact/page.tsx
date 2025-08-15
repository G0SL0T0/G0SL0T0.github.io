'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsSection from '@/components/NewsSection';
import StubbornButton from '@/components/StubbornButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки формы
    setTimeout(() => {
      toast({
        title: "Сообщение отправлено!",
        description: "Спасибо за ваше сообщение. Я свяжусь с вами в ближайшее время.",
        variant: "default",
      });
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Контакты</h1>
          
          <div className="max-w-6xl mx-auto">
            {/* Введение */}
            <section className="mb-16 text-center">
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Свяжитесь со мной, если у вас есть вопросы, предложения или 
                вы хотите обсудить потенциальный проект. Я всегда открыт 
                к новым возможностям и интересным задачам.
              </p>
            </section>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Контактная информация */}
              <section>
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Контактная информация</h2>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-blue-600">Электронная почта</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <a 
                        href="mailto:ivan@example.com" 
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        ivan@example.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-green-600">Телефон</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5a2 2 0 012-2h1z" />
                        </svg>
                      </div>
                      <a 
                        href="tel:+79991234567" 
                        className="text-gray-600 hover:text-green-600 transition-colors"
                      >
                        +7 (999) 123-45-67
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-purple-600">Социальные сети</h3>
                    <div className="flex gap-4">
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center hover:bg-purple-200 transition-colors"
                        aria-label="GitHub"
                      >
                        <svg className="w-5 h-5 text-purple-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                      
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 6.267 2.375 6.267 7.049v6.772zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                      
                      <a 
                        href="#" 
                        className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center hover:bg-sky-200 transition-colors"
                        aria-label="Telegram"
                      >
                        <svg className="w-5 h-5 text-sky-600" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.15-.8 5.18-1.13 6.8-.14.65-.41 1.1-.82 1.35-.48.29-1.05.15-1.65-.15-.94-.23-2.98-.45-3.63-.5-.94-.14-1.63.67-2.11 1.07-.67.5-.94 1.45-1.58 1.45-.63 0-.78-.39-.78-.39s-.15.24-.15.67c0 .79.53 1.51 1.53 2.1.92.54 2.06.84 3.26.84 2.76 0 4.96-1.33 4.96-4.55 0-2.84-2.43-5.12-5.5-5.12-5.37 0-9.12 3.67-9.12 8.93 0 1.76.65 3.51 1.82 4.76.42.46.49 1.23.49 1.23-.67 0-.67-.67-1.49-1.49-2.32-1.65-1.65-4.2-2.76-6.77-2.76-4.67 0-8.45 3.78-8.45 8.45 0 4.18 3.06 7.64 7.31 8.24.88.12 1.82.12 2.71.01 2.86-.33 5.71-1.63 5.71-1.63.12-.07.24-.14.36-.22z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl shadow-md">
                    <h3 className="text-lg font-semibold mb-4 text-orange-600">Местоположение</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span className="text-gray-600">Москва, Россия</span>
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Форма обратной связи */}
              <section>
                <h2 className="text-2xl font-bold mb-8 text-gray-800">Написать мне</h2>
                
                <div className="bg-white rounded-xl shadow-md p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ваше имя"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Тема</Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Тема сообщения"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Сообщение</Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Ваше сообщение..."
                        rows={5}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full"
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                    </Button>
                  </form>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <NewsSection />
      <StubbornButton />
    </div>
  );
}