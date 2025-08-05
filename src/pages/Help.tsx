import { motion } from 'framer-motion';
import {  Mail, Clock, MessageSquare, Phone } from 'lucide-react';

const faqs = [
  {
    icon: <Mail className="text-[#00B8B8] w-6 h-6" />,
    question: 'How can I contact support?',
    answer: 'Email us at support@qualityclinics.sa or call 920004864.',
  },
  {
    icon: <Clock className="text-[#00B8B8] w-6 h-6" />,
    question: 'What are your support hours?',
    answer: 'Sunday to Thursday, 9 AM – 6 PM (KSA Time).',
  },
  {
    icon: <MessageSquare className="text-[#00B8B8] w-6 h-6" />,
    question: 'Where can I provide feedback?',
    answer: 'Use our Complaints or Suggestions form.',
  },
  {
    icon: <Phone className="text-[#00B8B8] w-6 h-6" />,
    question: 'Need immediate assistance?',
    answer: 'Click the WhatsApp button at the bottom right.',
  },
];

const Help = () => {
  return (
    <div className="bg-black text-white min-h-screen py-16 px-6 md:px-20">
      <motion.h1
        className="text-5xl font-bold text-center text-[#00B8B8] mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Help & Support
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            className="bg-[#111] border border-teal-900 p-6 rounded-xl shadow-md hover:shadow-teal-500/30 transition duration-300"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              {item.icon}
              <h2 className="text-xl font-semibold text-[#00B8B8]">{item.question}</h2>
            </div>
            <p className="text-gray-300">{item.answer}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Help;
