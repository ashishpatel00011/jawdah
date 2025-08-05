
import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. What We Collect',
    content:
      'We collect personal information such as your name, email, and contact details when you subscribe or interact with our site.',
  },
  {
    title: '2. How It\'s Used',
    content:
      'Your information helps us provide better service, notify you about events, and personalize your experience.',
  },
  {
    title: '3. Your Control',
    content:
      'You may request data removal or opt out of marketing at any time by contacting us directly.',
  },
  {
    title: '4. Contact',
    content: (
      <>
        For questions, email us at{' '}
        <a
          href="mailto:info@qualityclinics.sa"
          className="underline text-[#00B8B8] hover:text-teal-300 transition"
        >
          info@qualityclinics.sa
        </a>
        .
      </>
    ),
  },
];

const Privacy = () => {
  return (
    <div className="bg-black text-white min-h-screen py-20 px-4 flex items-center justify-center">
      <motion.div
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-10 max-w-3xl w-full space-y-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold text-center text-[#00B8B8] drop-shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Privacy Policy
        </motion.h1>

        <div className="space-y-8 text-gray-300 text-base leading-relaxed">
          {sections.map((section, index) => (
            <motion.section
              key={index}
              className="transition-all duration-500"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.5 }}
            >
              <h2 className="text-xl font-semibold text-[#00B8B8] mb-1 drop-shadow-md">
                {section.title}
              </h2>
              <p>{section.content}</p>
            </motion.section>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Privacy;
