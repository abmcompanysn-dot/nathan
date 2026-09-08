import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import {
  ShoppingCart, MessageCircle, Shield, Star, CheckCircle, Play,
  Zap, TrendingUp, Users, Award, Clock, ChevronDown, Lock,
  Smartphone, CreditCard, ArrowRight, Sparkles, BookOpen, Video,
  FileText, Headphones, Gift, X, Phone, Mail
} from 'lucide-react';

// ============ ANIMATION VARIANTS ============
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } }
};

// ============ SECTION WRAPPER ============
function AnimatedSection({ children, className = '', delay = 0, id }: { children: React.ReactNode; className?: string; delay?: number; id?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: 'easeOut' } }
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

// ============ STICKY CTA BAR ============
function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 z-50 bg-dark-secondary/95 backdrop-blur-md border-t border-gold/20 px-4 py-3 md:hidden"
    >
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div>
          <p className="text-text-primary font-semibold text-sm">DigiAcademy Pro</p>
          <p className="text-gold font-bold">25 000 FCFA</p>
        </div>
        <a
          href="#commander"
          className="bg-gold text-dark-primary font-bold px-6 py-3 rounded-full text-sm hover:bg-gold/90 transition-all btn-glow"
        >
          Acheter maintenant
        </a>
      </div>
    </motion.div>
  );
}

// ============ WHATSAPP BUTTON ============
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/2250700000000?text=Bonjour%2C%20je%20suis%20intéressé(e)%20par%20DigiAcademy"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 2, type: 'spring' }}
      className="fixed bottom-20 md:bottom-6 right-4 z-50 bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform"
      title="Poser une question sur WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  );
}

// ============ HERO SECTION ============
function HeroSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.5]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full border border-gold/5"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-1/2 -left-1/2 w-full h-full rounded-full border border-terracotta/5"
        />
        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5
            }}
            className="absolute w-2 h-2 rounded-full bg-gold/20"
            style={{
              top: `${20 + i * 12}%`,
              left: `${10 + i * 15}%`
            }}
          />
        ))}
      </div>

      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-2 mb-6"
        >
          <Sparkles size={16} className="text-gold" />
          <span className="text-gold text-sm font-medium">+2 500 élèves formés en Afrique de l'Ouest</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6"
        >
          Lance Ton Business Digital
          <br />
          <span className="gradient-text">En 30 Jours</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-8"
        >
          La formation complète pour générer tes premiers revenus en ligne depuis la Côte d'Ivoire, le Sénégal, le Mali ou partout en Afrique de l'Ouest — même sans expérience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <a
            href="#commander"
            className="bg-gold text-dark-primary font-bold px-8 py-4 rounded-full text-lg hover:bg-gold/90 transition-all btn-glow animate-pulse-gold flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            Acheter — 25 000 FCFA
          </a>
          <a
            href="#contenu"
            className="border border-text-secondary/30 text-text-primary px-6 py-4 rounded-full text-lg hover:border-gold/50 transition-all flex items-center gap-2"
          >
            <Play size={18} />
            Voir le programme
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex items-center justify-center gap-6 text-text-secondary text-sm"
        >
          <div className="flex items-center gap-1">
            <Shield size={14} className="text-emerald" />
            <span>Paiement sécurisé</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={14} className="text-emerald" />
            <span>Accès immédiat</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={24} className="text-gold/60 mx-auto" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ============ PROBLEM SECTION ============
function ProblemSection() {
  const problems = [
    { icon: <TrendingUp size={24} />, text: "Tu veux gagner de l'argent en ligne mais tu ne sais pas par où commencer" },
    { icon: <Users size={24} />, text: "Tu vois les autres réussir sur internet et tu te demandes pourquoi pas toi" },
    { icon: <Clock size={24} />, text: "Tu as essayé des formations gratuites YouTube mais rien de concret" },
    { icon: <Smartphone size={24} />, text: "Tu penses qu'il faut un gros budget ou être à l'étranger pour réussir" }
  ];

  return (
    <AnimatedSection className="py-20 md:py-28 px-4 bg-dark-secondary/50">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Tu te reconnais dans <span className="gradient-text">ça</span> ?
          </h2>
          <p className="text-text-secondary text-lg">
            Tu n'es pas seul(e). Des milliers de jeunes Africains vivent exactement la même chose.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-2 gap-4"
        >
          {problems.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex items-start gap-4 bg-dark-primary/60 border border-white/5 rounded-2xl p-5 hover:border-terracotta/30 transition-all"
            >
              <div className="text-terracotta shrink-0 mt-1">{item.icon}</div>
              <p className="text-text-primary/90">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={fadeInUp} className="text-center mt-10">
          <p className="text-xl md:text-2xl font-semibold text-text-primary">
            La bonne nouvelle ? <span className="gradient-text">Il existe une solution.</span>
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ============ SOLUTION SECTION ============
function SolutionSection() {
  const features = [
    { icon: <BookOpen size={28} />, title: "Formation vidéo complète", desc: "12 modules pas-à-pas, du premier euro au premier million FCFA" },
    { icon: <Smartphone size={28} />, title: "100% mobile-friendly", desc: "Regarde les cours depuis ton téléphone, quand tu veux, où tu veux" },
    { icon: <Users size={28} />, title: "Communauté privée", desc: "Groupe WhatsApp d'élèves actifs pour t'accompagner chaque jour" },
    { icon: <Zap size={28} />, title: "Méthodes adaptées à l'Afrique", desc: "Stratégies qui marchent ici, pas des conseils occidentaux déconnectés" }
  ];

  return (
    <AnimatedSection className="py-20 md:py-28 px-4 bg-mesh">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-14">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Voici <span className="gradient-text">DigiAcademy Pro</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            La formation qui t'accompagne de A à Z pour construire un vrai business digital rentable, adapté à notre réalité africaine.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className="bg-dark-secondary/80 border border-white/5 rounded-2xl p-6 hover:border-gold/30 transition-all group"
            >
              <div className="text-gold mb-4 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-text-secondary">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-10">
          <a
            href="#commander"
            className="inline-flex items-center gap-2 bg-gold text-dark-primary font-bold px-8 py-4 rounded-full text-lg hover:bg-gold/90 transition-all btn-glow"
          >
            <ShoppingCart size={20} />
            Je veux accéder à la formation
          </a>
        </div>
      </div>
    </AnimatedSection>
  );
}

// ============ BENEFITS SECTION ============
function BenefitsSection() {
  const benefits = [
    "Génère tes premiers 100 000 FCFA en ligne en moins de 30 jours",
    "Construis une audience fidèle sur les réseaux sociaux",
    "Vends tes compétences ou produits sans stock ni local",
    "Travaille depuis chez toi, avec juste ton téléphone",
    "Crée des revenus récurrents et stables chaque mois",
    "Deviens indépendant financièrement sans quitter ton pays"
  ];

  return (
    <AnimatedSection className="py-20 md:py-28 px-4 bg-dark-secondary/30">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ce que tu vas <span className="gradient-text">accomplir</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="flex items-center gap-4 bg-dark-primary/50 border border-white/5 rounded-xl p-4 hover:border-emerald/30 transition-all"
            >
              <CheckCircle size={22} className="text-emerald shrink-0" />
              <p className="text-text-primary text-lg">{b}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ============ CONTENT SECTION ============
function ContentSection() {
  const [openModule, setOpenModule] = useState<number | null>(null);

  const modules = [
    {
      title: "Module 1 — Les fondations",
      lessons: ["Trouver ta niche rentable", "Étudier ton marché local", "Définir ton offre irrésistible"],
      icon: <BookOpen size={20} />
    },
    {
      title: "Module 2 — Ton identité en ligne",
      lessons: ["Créer tes pages pro (Facebook, Instagram, TikTok)", "Rédiger des bios qui convertissent", "Ton premier contenu viral"],
      icon: <Sparkles size={20} />
    },
    {
      title: "Module 3 — Attirer tes premiers clients",
      lessons: ["La méthode gratuite pour avoir 1000 followers", "Créer du contenu qui vend", "Le copywriting adapté à l'Afrique"],
      icon: <Users size={20} />
    },
    {
      title: "Module 4 — Vendre sans site web",
      lessons: ["Vendre via WhatsApp Business", "Les techniques de closing par message", "Gérer tes commandes facilement"],
      icon: <MessageCircle size={20} />
    },
    {
      title: "Module 5 — Automatiser et scaler",
      lessons: ["Mettre en place un tunnel de vente simple", "Utiliser les outils gratuits", "Passer de 100K à 1M FCFA/mois"],
      icon: <TrendingUp size={20} />
    },
    {
      title: "Module 6 — Bonus & Ressources",
      lessons: ["Templates de posts prêts à l'emploi", "Scripts de vente WhatsApp", "Liste des outils indispensables"],
      icon: <Gift size={20} />
    }
  ];

  return (
    <AnimatedSection className="py-20 md:py-28 px-4" id="contenu">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Le programme <span className="gradient-text">complet</span>
          </h2>
          <p className="text-text-secondary text-lg">6 modules, 40+ leçons vidéo, des ressources téléchargeables</p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {modules.map((m, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-dark-secondary/60 border border-white/5 rounded-2xl overflow-hidden hover:border-gold/20 transition-all"
            >
              <button
                onClick={() => setOpenModule(openModule === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="text-gold">{m.icon}</div>
                  <span className="font-semibold text-lg">{m.title}</span>
                </div>
                <motion.div
                  animate={{ rotate: openModule === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={20} className="text-text-secondary" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openModule === i ? 'auto' : 0,
                  opacity: openModule === i ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5 space-y-2">
                  {m.lessons.map((l, j) => (
                    <div key={j} className="flex items-center gap-3 text-text-secondary">
                      <Video size={14} className="text-gold/60" />
                      <span>{l}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ============ TESTIMONIALS SECTION ============
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Aïcha K.",
      location: "Abidjan, Côte d'Ivoire",
      text: "En 3 semaines j'ai fait mes premiers 150 000 FCFA en vendant des services de gestion de réseaux sociaux. La formation m'a tout appris, même les messages WhatsApp pour convaincre les clients.",
      rating: 5
    },
    {
      name: "Moussa D.",
      location: "Dakar, Sénégal",
      text: "J'étais sceptique au début mais j'ai suivi le programme à la lettre. Aujourd'hui je gagne plus avec mon business en ligne qu'avec mon ancien salaire. Merci DigiAcademy !",
      rating: 5
    },
    {
      name: "Fatou S.",
      location: "Bamako, Mali",
      text: "Le groupe WhatsApp est incroyable. On s'entraide vraiment. Et les méthodes sont adaptées à notre réalité — pas de conseils genre 'fais un site web à 5000€'.",
      rating: 5
    },
    {
      name: "Kofi A.",
      location: "Lomé, Togo",
      text: "Avec juste mon téléphone et la formation, j'ai lancé mon activité de vente de cosmétiques en ligne. 300 000 FCFA le premier mois. C'est réel.",
      rating: 5
    }
  ];

  return (
    <AnimatedSection className="py-20 md:py-28 px-4 bg-dark-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Ils l'ont fait. <span className="gradient-text">Toi aussi.</span>
          </h2>
          <p className="text-text-secondary text-lg">+2 500 élèves nous font confiance à travers l'Afrique de l'Ouest</p>
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-10">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={24} className="text-gold fill-gold" />
          ))}
          <span className="text-text-secondary ml-2">4.8/5 — basé sur 340+ avis</span>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-5"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-dark-primary/60 border border-white/5 rounded-2xl p-6"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="text-gold fill-gold" />
                ))}
              </div>
              <p className="text-text-primary/90 mb-4 italic">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                  {t.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-text-secondary text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ============ PRICING SECTION ============
function PricingSection() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatedSection className="py-20 md:py-28 px-4 bg-mesh" id="commander">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Investis dans <span className="gradient-text">ton avenir</span>
          </h2>
          <p className="text-text-secondary text-lg">Un seul paiement, un accès à vie</p>
        </motion.div>

        {/* Countdown */}
        <motion.div variants={scaleIn} className="text-center mb-8">
          <p className="text-terracotta font-semibold mb-3 flex items-center justify-center gap-2">
            <Clock size={16} />
            Offre de lancement — prix spécial encore valable pendant :
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="bg-dark-secondary border border-gold/30 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold text-gold">{String(timeLeft.hours).padStart(2, '0')}</span>
              <span className="text-text-secondary text-xs block">heures</span>
            </div>
            <span className="text-gold text-2xl font-bold">:</span>
            <div className="bg-dark-secondary border border-gold/30 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold text-gold">{String(timeLeft.minutes).padStart(2, '0')}</span>
              <span className="text-text-secondary text-xs block">min</span>
            </div>
            <span className="text-gold text-2xl font-bold">:</span>
            <div className="bg-dark-secondary border border-gold/30 rounded-lg px-4 py-2">
              <span className="text-2xl font-bold text-gold">{String(timeLeft.seconds).padStart(2, '0')}</span>
              <span className="text-text-secondary text-xs block">sec</span>
            </div>
          </div>
        </motion.div>

        {/* Pricing card */}
        <motion.div
          variants={scaleIn}
          className="bg-dark-secondary border-2 border-gold/40 rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-terracotta text-white text-xs font-bold px-4 py-2 rounded-bl-xl">
            -50% LIMITÉ
          </div>

          <div className="text-center mb-8">
            <p className="text-text-secondary line-through text-xl mb-1">50 000 FCFA</p>
            <p className="text-5xl md:text-6xl font-black text-gold mb-2">25 000 <span className="text-3xl">FCFA</span></p>
            <p className="text-text-secondary">Paiement unique — Accès à vie</p>
          </div>

          <div className="space-y-3 mb-8">
            {[
              "6 modules complets (40+ leçons vidéo)",
              "Accès au groupe WhatsApp privé",
              "Templates et scripts de vente",
              "Mises à jour gratuites à vie",
              "Support direct par WhatsApp",
              "Certificat de fin de formation"
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald shrink-0" />
                <span className="text-text-primary">{item}</span>
              </div>
            ))}
          </div>

          <a
            href="#checkout"
            className="block w-full bg-gold text-dark-primary font-bold text-center py-5 rounded-full text-xl hover:bg-gold/90 transition-all btn-glow animate-pulse-gold"
          >
            <span className="flex items-center justify-center gap-2">
              <ShoppingCart size={22} />
              Acheter maintenant — 25 000 FCFA
            </span>
          </a>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-text-secondary text-sm">
            <div className="flex items-center gap-1">
              <Lock size={14} className="text-emerald" />
              <span>Paiement 100% sécurisé</span>
            </div>
            <div className="flex items-center gap-1">
              <Shield size={14} className="text-emerald" />
              <span>Satisfait ou remboursé 7 jours</span>
            </div>
          </div>
        </motion.div>

        {/* Payment methods */}
        <motion.div variants={fadeInUp} className="mt-8 text-center">
          <p className="text-text-secondary text-sm mb-3">Moyens de paiement acceptés :</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Orange Money', 'MTN MoMo', 'Moov Money', 'Wave', 'Carte bancaire'].map((method, i) => (
              <div key={i} className="bg-dark-secondary border border-white/10 rounded-lg px-4 py-2 text-sm text-text-primary">
                {method}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ============ CHECKOUT FORM ============
function CheckoutSection() {
  const [formData, setFormData] = useState({
    nom: '', prenom: '', email: '', telephone: '', moyenPaiement: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <AnimatedSection className="py-20 px-4" id="checkout">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-20 h-20 bg-emerald/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle size={40} className="text-emerald" />
          </motion.div>
          <h3 className="text-2xl font-bold mb-3">Commande confirmée !</h3>
          <p className="text-text-secondary">
            Tu vas recevoir les instructions de paiement par email et WhatsApp dans les prochaines minutes. Bienvenue dans DigiAcademy ! 🎉
          </p>
        </div>
      </AnimatedSection>
    );
  }

  return (
    <AnimatedSection className="py-16 px-4 bg-dark-secondary/50" id="checkout">
      <div className="max-w-lg mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Finalise ta commande</h2>
          <p className="text-text-secondary">Remplis le formulaire ci-dessous pour accéder immédiatement à la formation</p>
        </motion.div>

        <motion.form
          variants={fadeInUp}
          onSubmit={handleSubmit}
          className="space-y-4 bg-dark-primary/60 border border-white/5 rounded-2xl p-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-text-secondary mb-1 block">Prénom</label>
              <input
                type="text"
                required
                value={formData.prenom}
                onChange={e => setFormData({ ...formData, prenom: e.target.value })}
                className="w-full bg-dark-secondary border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:border-gold/50 focus:outline-none transition-colors"
                placeholder="Ton prénom"
              />
            </div>
            <div>
              <label className="text-sm text-text-secondary mb-1 block">Nom</label>
              <input
                type="text"
                required
                value={formData.nom}
                onChange={e => setFormData({ ...formData, nom: e.target.value })}
                className="w-full bg-dark-secondary border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:border-gold/50 focus:outline-none transition-colors"
                placeholder="Ton nom"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-text-secondary mb-1 block">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-dark-secondary border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:border-gold/50 focus:outline-none transition-colors"
              placeholder="ton@email.com"
            />
          </div>

          <div>
            <label className="text-sm text-text-secondary mb-1 block">Numéro de téléphone</label>
            <input
              type="tel"
              required
              value={formData.telephone}
              onChange={e => setFormData({ ...formData, telephone: e.target.value })}
              className="w-full bg-dark-secondary border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:border-gold/50 focus:outline-none transition-colors"
              placeholder="+225 07 00 00 00 00"
            />
          </div>

          <div>
            <label className="text-sm text-text-secondary mb-1 block">Moyen de paiement</label>
            <select
              required
              value={formData.moyenPaiement}
              onChange={e => setFormData({ ...formData, moyenPaiement: e.target.value })}
              className="w-full bg-dark-secondary border border-white/10 rounded-lg px-4 py-3 text-text-primary focus:border-gold/50 focus:outline-none transition-colors"
            >
              <option value="">Choisis ton moyen de paiement</option>
              <option value="orange-money">Orange Money</option>
              <option value="mtn-momo">MTN Mobile Money</option>
              <option value="moov-money">Moov Money</option>
              <option value="wave">Wave</option>
              <option value="carte">Carte bancaire</option>
            </select>
          </div>

          <div className="bg-dark-secondary/50 border border-gold/20 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">Total à payer</p>
              <p className="text-text-secondary text-sm">DigiAcademy Pro — Accès à vie</p>
            </div>
            <p className="text-2xl font-bold text-gold">25 000 FCFA</p>
          </div>

          <button
            type="submit"
            className="w-full bg-gold text-dark-primary font-bold py-4 rounded-full text-lg hover:bg-gold/90 transition-all btn-glow flex items-center justify-center gap-2"
          >
            <Lock size={18} />
            Payer maintenant — 25 000 FCFA
          </button>

          <div className="flex items-center justify-center gap-4 text-text-secondary text-xs">
            <div className="flex items-center gap-1">
              <Shield size={12} className="text-emerald" />
              <span>Paiement sécurisé</span>
            </div>
            <div className="flex items-center gap-1">
              <Lock size={12} className="text-emerald" />
              <span>Données protégées</span>
            </div>
          </div>
        </motion.form>
      </div>
    </AnimatedSection>
  );
}

// ============ FAQ SECTION ============
function FAQSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Est-ce que ça marche vraiment depuis l'Afrique ?",
      a: "Absolument. Toute la formation est pensée pour le contexte ouest-africain : méthodes adaptées, outils accessibles ici, moyens de paiement locaux. Nos élèves viennent de Côte d'Ivoire, Sénégal, Mali, Burkina, Togo, Bénin..."
    },
    {
      q: "J'ai besoin d'un ordinateur ?",
      a: "Non ! Tu peux tout faire depuis ton smartphone. Les vidéos sont optimisées pour mobile et tu peux les regarder même avec une connexion 3G."
    },
    {
      q: "Combien de temps faut-il pour voir des résultats ?",
      a: "Nos élèves les plus motivés voient leurs premiers revenus entre 2 et 4 semaines. Tout dépend de ton implication, mais le programme est conçu pour des résultats rapides."
    },
    {
      q: "Et si je n'ai aucune expérience ?",
      a: "C'est exactement pour les débutants que cette formation est faite. On part de zéro : pas besoin de savoir coder, de connaître le marketing, ou d'avoir un diplôme."
    },
    {
      q: "Comment se passe le paiement ?",
      a: "Tu peux payer par Orange Money, MTN MoMo, Moov Money, Wave ou carte bancaire. C'est 100% sécurisé et tu reçois l'accès immédiatement après le paiement."
    },
    {
      q: "Y a-t-il une garantie ?",
      a: "Oui ! Tu as 7 jours pour tester la formation. Si tu n'es pas satisfait, on te rembourse intégralement, sans question."
    }
  ];

  return (
    <AnimatedSection className="py-20 md:py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Questions <span className="gradient-text">fréquentes</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-dark-secondary/60 border border-white/5 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold pr-4">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openFaq === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-gold shrink-0"
                >
                  <X size={20} />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openFaq === i ? 'auto' : 0,
                  opacity: openFaq === i ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-5">
                  <p className="text-text-secondary">{faq.a}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ============ GUARANTEE SECTION ============
function GuaranteeSection() {
  return (
    <AnimatedSection className="py-20 md:py-28 px-4 bg-dark-secondary/30">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div variants={scaleIn} className="inline-flex items-center justify-center w-20 h-20 bg-emerald/10 rounded-full mb-6">
          <Shield size={40} className="text-emerald" />
        </motion.div>

        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold mb-4">
          Garantie <span className="gradient-text">satisfait ou remboursé</span>
        </motion.h2>

        <motion.p variants={fadeInUp} className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
          Tu as 7 jours pour explorer la formation. Si tu n'es pas convaincu(e), on te rembourse intégralement. Zéro risque pour toi.
        </motion.p>

        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <Lock size={24} />, title: "Paiement sécurisé", desc: "Via Mobile Money ou carte, 100% protégé" },
            { icon: <Award size={24} />, title: "Qualité garantie", desc: "Contenu mis à jour régulièrement" },
            { icon: <Headphones size={24} />, title: "Support réactif", desc: "Réponse sous 2h sur WhatsApp" }
          ].map((item, i) => (
            <motion.div key={i} variants={fadeInUp} className="bg-dark-primary/60 border border-white/5 rounded-2xl p-5">
              <div className="text-emerald mb-3 flex justify-center">{item.icon}</div>
              <h3 className="font-semibold mb-1">{item.title}</h3>
              <p className="text-text-secondary text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

// ============ FINAL CTA SECTION ============
function FinalCTASection() {
  return (
    <AnimatedSection className="py-20 md:py-28 px-4 bg-mesh">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold mb-4">
          Prêt(e) à <span className="gradient-text">passer à l'action</span> ?
        </motion.h2>
        <motion.p variants={fadeInUp} className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
          Rejoins les +2 500 élèves qui ont déjà transformé leur vie grâce à DigiAcademy Pro. Ton futur toi te remerciera.
        </motion.p>
        <motion.div variants={scaleIn}>
          <a
            href="#checkout"
            className="inline-flex items-center gap-2 bg-gold text-dark-primary font-bold px-10 py-5 rounded-full text-xl hover:bg-gold/90 transition-all btn-glow animate-pulse-gold"
          >
            <ShoppingCart size={24} />
            Acheter maintenant — 25 000 FCFA
            <ArrowRight size={20} />
          </a>
        </motion.div>
        <motion.p variants={fadeIn} className="text-text-secondary text-sm mt-4">
          Paiement sécurisé • Accès immédiat • Garantie 7 jours
        </motion.p>
      </div>
    </AnimatedSection>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="bg-dark-secondary border-t border-white/5 py-12 px-4 pb-24 md:pb-12">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-3 gradient-text">DigiAcademy</h3>
            <p className="text-text-secondary text-sm">
              La formation qui transforme les ambitions digitales en revenus concrets, partout en Afrique de l'Ouest.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-text-secondary text-sm">
              <div className="flex items-center gap-2">
                <MessageCircle size={14} className="text-emerald" />
                <span>WhatsApp : +225 07 00 00 00 00</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gold" />
                <span>contact@digiacademy.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold" />
                <span>+225 07 00 00 00 00</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Paiements acceptés</h4>
            <div className="flex flex-wrap gap-2">
              {['Orange Money', 'MTN MoMo', 'Wave', 'Carte'].map((m, i) => (
                <span key={i} className="bg-dark-primary border border-white/10 rounded px-2 py-1 text-xs text-text-secondary">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-6 text-center text-text-secondary text-xs">
          <p>© 2025 DigiAcademy. Tous droits réservés.</p>
          <p className="mt-1">
            <a href="#" className="hover:text-gold transition-colors">Mentions légales</a>
            {' • '}
            <a href="#" className="hover:text-gold transition-colors">Politique de confidentialité</a>
            {' • '}
            <a href="#" className="hover:text-gold transition-colors">CGV</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ============ MAIN APP ============
export default function App() {
  return (
    <div className="min-h-screen bg-dark-primary">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <BenefitsSection />
      <ContentSection />
      <TestimonialsSection />
      <PricingSection />
      <CheckoutSection />
      <FAQSection />
      <GuaranteeSection />
      <FinalCTASection />
      <Footer />
      <StickyCTA />
      <WhatsAppButton />
    </div>
  );
}
