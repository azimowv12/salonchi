"use client";
import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  Users, 
  Trophy, 
  Shield, 
  Rocket, 
  Heart,
  TrendingUp,
  Globe,
  Star,
  CheckCircle,
  Award,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function About1() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: '50K+', label: 'Baxtli mijoz', gradient: 'from-purple-500 to-pink-500' },
    { icon: <Trophy className="w-6 h-6" />, value: '99%', label: 'Mijoz mamnunligi', gradient: 'from-amber-500 to-orange-500' },
    { icon: <Rocket className="w-6 h-6" />, value: '1K+', label: 'Kunlik buyurtma', gradient: 'from-blue-500 to-cyan-500' },
    { icon: <Globe className="w-6 h-6" />, value: '10+', label: 'Shaharlar', gradient: 'from-emerald-500 to-teal-500' },
  ];

  const values = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Innovatsion Yondashuv',
      description: 'Har doim yangi texnologiyalar va yechimlarni qo\'llaymiz',
      color: 'bg-gradient-to-br from-purple-100 to-pink-100',
      iconColor: 'text-purple-600'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Mijozlar Sevgi',
      description: 'Har bir mijoz bizning oilamizning bir qismidir',
      color: 'bg-gradient-to-br from-red-100 to-pink-100',
      iconColor: 'text-red-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Ishonch va Xavfsizlik',
      description: 'Har qadamda maksimal xavfsizlik va shaffoflik',
      color: 'bg-gradient-to-br from-blue-100 to-cyan-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Doimiy Takomil',
      description: 'Har kuni o\'zimizni yaxshilashga intilamiz',
      color: 'bg-gradient-to-br from-green-100 to-emerald-100',
      iconColor: 'text-green-600'
    },
  ];

  const team = [
    {
      name: 'Aziza Malikova',
      role: 'CEO & Asoschi',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=face',
      delay: 0.1
    },
    {
      name: 'Javlon Ergashev',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      delay: 0.2
    },
    {
      name: 'Madina Qodirova',
      role: 'Marketing Direktori',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      delay: 0.3
    },
    {
      name: 'Sherzod Tursunov',
      role: 'Operatsion Menejer',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      delay: 0.4
    },
  ];

  const achievements = [
    { year: '2020', title: 'Startap boshlanishi', description: 'Kichik ofisda birinchi qadamlar' },
    { year: '2021', title: 'Platforma ishga tushdi', description: 'Birinchi 1000 mijozga xizmat' },
    { year: '2022', title: 'Mamlakat bo\'ylab kengayish', description: '5 yangi shaharga kirish' },
    { year: '2023', title: 'Mobil ilova chiqarildi', description: 'App Store va Google Play\'da' },
    { year: '2024', title: 'Yevropa bozorlariga ochilish', description: 'Xalqaro hamkorlik boshlanishi' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 -right-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-40 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-6xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block mb-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-xl opacity-75"></div>
              <Sparkles className="relative w-20 h-20 text-white p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Kelajakni Biz <br /> Bilan Qur
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            2020-yildan beri raqamli inqilobni etakchilari bo'lib, 
            har bir mijozga <span className="font-semibold text-purple-600">yodgorlikda qoladigan tajriba</span> yaratib kelmoqdamiz
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a 
              href="./" 
              className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/30"
            >
              <span className="relative z-10">Mahsulotlarni Ko'rish</span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a 
              href="/contact" 
              className="group px-8 py-4 border-2 border-purple-600 text-purple-600 rounded-full font-semibold text-lg hover:bg-purple-50 transition-all duration-300"
            >
              <span className="relative">Bog'lanish</span>
            </a>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-6 h-10 border-2 border-purple-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-purple-500 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="relative">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.gradient} mb-4`}>
                    <div className="text-white">{stat.icon}</div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">BIZNING MISSIYA</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Har bir xaridingiz <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">hayotingizni</span> yaxshilash uchun
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Bizning maqsadimiz - faqat mahsulot sotish emas, balki hayotingizni soddalashtirish va 
                <span className="font-semibold text-purple-600"> har bir xarid siz uchun yangi qulaylik</span> keltirishidir.
              </p>
              
              <div className="space-y-4">
                {[
                  'Premium mahsulotlar sifat kafolati',
                  '24/7 mijozlar qo\'llab-quvvatlash',
                  'Tezkor va bepul yetkazib berish',
                  '100% xavfsiz to\'lov tizimi'
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative z-10">
                <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=1200&fit=crop" 
                    alt="Our Mission"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 w-2/3 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                <Award className="w-10 h-10 text-amber-500 mb-3" />
                <div className="text-2xl font-bold text-gray-900">"2024 Yilning eng yaxshi startapi"</div>
                <div className="text-gray-600 text-sm mt-2">Innovatsion biznes mukofoti</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="relative py-20 bg-gradient-to-b from-white to-gray-50 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Bizning <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Qadriyatlar</span>imiz
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Har bir qaror va harakatimizni shakllantiradigan tamoyillar
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className={`${value.color} rounded-2xl p-8 h-full transition-all duration-300 group-hover:shadow-2xl`}>
                  <div className={`inline-flex p-3 rounded-xl ${value.iconColor} bg-white mb-6`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-20 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Ustozlar</span> Jamoa
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Har bir a'zosi o'z sohasining eng yaxshi mutaxassislari
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: member.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white shadow-xl group-hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="text-white">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-purple-200">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-purple-600 font-medium">{member.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white z-10">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Muvaffaqiyatli <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Sayohat</span>
            </h2>
          </motion.div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-500 hidden md:block"></div>
            
            {achievements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative mb-12 pl-8 md:pl-0"
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 top-6 w-4 h-4 md:-translate-x-1/2 bg-white border-4 border-purple-500 rounded-full z-20"></div>
                
                {/* Content */}
                <div className={`bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ${
                  index % 2 === 0 ? 'md:mr-auto md:pr-8 md:text-right md:w-[calc(50%-2rem)]' : 'md:ml-auto md:pl-8 md:w-[calc(50%-2rem)]'
                }`}>
                  <div className="inline-flex items-center gap-2 px-4 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
                    <Star className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-bold text-purple-600">{item.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=2000')] opacity-10 bg-cover"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto px-4 text-center z-20"
        >
          <Sparkles className="w-16 h-16 text-white mx-auto mb-8" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Biz bilan <span className="text-yellow-300">kelajakni</span> quring
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Siz ham bizning muvaffaqiyatli hamkorlarimiz qatoriga qo'shiling
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/contact" 
              className="group px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              <span className="relative flex items-center justify-center gap-2">
                Hamkorlik qilish
                <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            
            <a 
              href="/products" 
              className="group px-8 py-4 border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              <span className="relative flex items-center justify-center gap-2">
                Xarid qilishni boshlash
                <Zap className="w-5 h-5" />
              </span>
            </a>
          </div>
        </motion.div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}