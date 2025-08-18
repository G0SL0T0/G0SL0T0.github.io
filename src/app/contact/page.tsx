// src/app/contact/page.tsx
'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsTab from '@/components/NewsTab';
import StubbornButton from '@/components/StubbornButton';
import '@/app/globals.css';
import '@/styles/contact.css';
import '@/styles/news-tab.css';
import '@/styles/hobbies.css';
import ScrollToTop from '@/components/ScrollToTop';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string; // Для honeypot
}

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: ''
  });
  const [status, setStatus] = useState<{ message: string; color: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showNewsModal, setShowNewsModal] = useState(false);

  // Инициализация EmailJS
  useEffect(() => {
    const loadEmailJS = () => {
      if (typeof window !== 'undefined' && !(window as any).emailjs) {
        const script = document.createElement('script');
        script.src = 'https://cdn.emailjs.com/dist/email.min.js';
        script.async = true;
        script.onload = () => {
          (window as any).emailjs.init("WQbftsAP5U1VYjWO-");
        };
        document.body.appendChild(script);
      }
    };

    loadEmailJS();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    // Валидация honeypot
    if (formData.website) {
      setStatus({ message: 'Обнаружена подозрительная активность', color: 'text-red-500' });
      return false;
    }

    // Валидация полей
    if (!formData.name.trim() || formData.name.length < 2 || formData.name.length > 50) {
      setStatus({ message: 'Имя должно содержать от 2 до 50 символов', color: 'text-red-500' });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ message: 'Введите корректный email', color: 'text-red-500' });
      return false;
    }

    if (!formData.subject.trim() || formData.subject.length < 5 || formData.subject.length > 100) {
      setStatus({ message: 'Тема должна содержать от 5 до 100 символов', color: 'text-red-500' });
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 10 || formData.message.length > 1000) {
      setStatus({ message: 'Сообщение должно содержать от 10 до 1000 символов', color: 'text-red-500' });
      return false;
    }

    // Проверка на SQL-инъекции и XSS
    const maliciousPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION)\b)/gi,
      /(--|#|\/\*|\*\/|xp_)/gi,
      /(script|javascript:|vbscript:|onload|onerror)/gi
    ];

    const combinedInput = `${formData.name} ${formData.email} ${formData.subject} ${formData.message}`;
    for (const pattern of maliciousPatterns) {
      if (pattern.test(combinedInput)) {
        setStatus({ message: 'Обнаружена подозрительная активность', color: 'text-red-500' });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setStatus(null);

    try {
      if (typeof window !== 'undefined' && (window as any).emailjs) {
        const serviceID = "service_4gqo5nl";
        const templateID = "template_rlc7wya";
        
        await (window as any).emailjs.send(serviceID, templateID, {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        });
        
        setStatus({ message: '✅ Сообщение отправлено!', color: 'text-green-500' });
        setFormData({ name: '', email: '', subject: '', message: '', website: '' });
      } else {
        throw new Error('EmailJS не загружен');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setStatus({ message: 'Ошибка при отправке. Попробуйте позже.', color: 'text-red-500' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header />
      <main>
        <section className="contact">
          <div className="container">
            <h1 className="section-title">Свяжитесь со мной</h1>
            
            <div className="contact-content">
              <div className="contact-info">
                <h2 className="contact-subtitle">
                  <i className="fas fa-paper-plane"></i> Контактная информация
                </h2>
                <div className="contact-list">
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <div>
                      <h3>Email</h3>
                      <a href="mailto:Gosioto@yandex.ru">Gosioto@yandex.ru</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <div>
                      <h3>Телефон</h3>
                      <a href="tel:+79914783571">+7 (958) 231-73-64 (Иван)</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fab fa-telegram"></i>
                    <div>
                      <h3>Telegram</h3>
                      <a href="https://t.me/G0SL0T0" target="_blank" rel="noopener noreferrer">@G0SL0T0</a>
                    </div>
                  </div>
                  <div className="contact-item">
                    <i className="fab fa-github"></i>
                    <div>
                      <h3>GitHub</h3>
                      <a href="https://github.com/G0SL0T0" target="_blank" rel="noopener noreferrer">github.com/G0SL0T0</a>
                    </div>
                  </div>
                </div>
                
                <h2 className="contact-subtitle" style={{ marginTop: '2rem' }}>
                  <i className="fas fa-clock"></i> Часы активности
                </h2>
                <p>Пн-Пт: 6:00 - 20:00 по МСК</p>
                <p>Сб-Вс: 6:00 - 12:00 / 16:00 - 20:00 по МСК</p>
                
                <div className="social-links" style={{ marginTop: '2rem' }}>
                  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-vk"></i>
                  </a>
                  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href="#" className="social-icon" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                </div>
              </div>
              
              <div className="contact-form">
                <h2 className="contact-subtitle">
                  <i className="fas fa-envelope-open-text"></i> Форма обратной связи
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Ваше имя</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Ваш Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Тема</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Сообщение</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                    ></textarea>
                  </div>
                  
                  {/* Honeypot поле (скрытое от пользователей) */}
                  <div className="hidden">
                    <label htmlFor="website">Website</label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>
                  
                  <button type="submit" className="button" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i> Отправка…
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane"></i> Отправить
                      </>
                    )}
                  </button>
                  {status && (
                    <span className={`status-message ${status.color}`}>{status.message}</span>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <NewsTab showModal={showNewsModal} setShowModal={setShowNewsModal} />
      <StubbornButton />
      <ScrollToTop />

    </div>
  );
};

export default ContactPage;