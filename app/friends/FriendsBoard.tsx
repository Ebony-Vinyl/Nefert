"use client";

import { motion } from 'framer-motion';
import BackButton from '../../components/BackButton';
import { friendsData } from '../../data/friends';
import Comments from '../../components/Comments'; // 🌟 引入你的 Gitalk 组件

// Framer Motion 动画变体：交错子元素
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 } // 每张卡片延迟 0.15 秒出现
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

// 🌟 友链卡片（抽取为公共组件，网格与视频下方位共用）
function FriendCard({ friend }: { friend: (typeof friendsData)[number] }) {
  return (
    <div className="h-full">
      <a
        href={friend.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full rounded-2xl md:rounded-3xl bg-white/60 dark:bg-slate-800/50 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-lg md:shadow-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 hover:scale-[1.01] group relative p-4 md:p-8"
      >
        <div
          className="absolute -bottom-10 -right-10 w-24 h-24 md:w-32 md:h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ backgroundColor: friend.themeColor }}
        ></div>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 relative z-10 mb-2 md:mb-4">
          <div className="w-12 h-12 md:w-20 md:h-20 rounded-full p-[2px] md:p-1 bg-gradient-to-tr from-indigo-500/50 to-purple-500/50 shadow-sm md:shadow-md group-hover:rotate-[360deg] transition-transform duration-1000 ease-in-out flex-shrink-0">
            <img src={friend.avatar} alt={friend.name} className="w-full h-full rounded-full object-cover bg-white" />
          </div>
          <div className="flex-1 overflow-hidden w-full">
            <h2 className="text-base md:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors truncate">
              {friend.name}
            </h2>
            <div className="text-[9px] md:text-xs font-bold text-indigo-500/70 dark:text-indigo-400/70 tracking-widest uppercase mt-0.5 md:mt-1 flex items-center gap-1">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Online
            </div>
          </div>
        </div>

        <p className="text-[10px] md:text-sm text-slate-700 dark:text-slate-300 font-serif leading-snug md:leading-relaxed line-clamp-2 md:line-clamp-3 relative z-10">
          {friend.description}
        </p>
      </a>
    </div>
  );
}

export default function FriendsBoard() {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-10 py-6 md:py-10 relative z-10 scroll-smooth mt-20 md:mt-10">

      {/* 顶部导航与标题 */}
      <div className="mb-8 md:mb-12 flex flex-col items-center md:items-start">
        <div className="w-full flex justify-start mb-4 md:mb-6">
          <BackButton />
        </div>
        <div className="text-center md:text-left w-full px-2 md:px-0">
          <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white mb-2 md:mb-4 tracking-widest drop-shadow-sm uppercase">
            云端引力
          </h1>
          <p className="text-xs md:text-base text-slate-600 dark:text-slate-400 font-serif">
            那些散落在赛博宇宙各处的有趣灵魂与神经节点。
          </p>
        </div>
      </div>

      {/* 🌟 友链网格（长方形平铺） */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-3 md:gap-6"
      >
        {friendsData
          .filter((friend) => friend.id !== "ner")
          .map((friend) => (
            <motion.div key={friend.id} variants={itemVariants} className="h-full">
              <FriendCard friend={friend} />
            </motion.div>
          ))}
      </motion.div>

      {/* 🌟 ZX-Code 产品展示视频 */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-12 md:mt-16"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
          <span className="w-8 md:w-12 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
          <h3 className="text-sm md:text-xl font-bold text-slate-800 dark:text-gray-200 tracking-widest uppercase">
            ZX-Code 产品演示
          </h3>
          <span className="w-8 md:w-12 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
        </div>

        <div className="bg-white/40 dark:bg-slate-800/40 backdrop-blur-xl border border-white/50 dark:border-slate-700/50 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-lg md:shadow-xl max-w-3xl mx-auto">
          <video
            src="/videos/zx-code-demo.mp4"
            controls
            playsInline
            preload="metadata"
            className="w-full rounded-xl md:rounded-2xl bg-black shadow-inner"
          />
          <p className="text-[10px] md:text-sm text-slate-600 dark:text-slate-400 font-serif text-center mt-3 md:mt-4 leading-relaxed">
            ZX-Code：自进化技能引擎 · 无 Key 直连九家国产大模型 · 多智能体编排的一站式 Agent。
          </p>
        </div>
      </motion.div>

      {/* 🌟 shi 友链（产品视频下方） */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-12 md:mt-16 max-w-3xl mx-auto"
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
          <span className="w-8 md:w-12 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
          <h3 className="text-sm md:text-xl font-bold text-slate-800 dark:text-gray-200 tracking-widest uppercase">
            产品介绍
          </h3>
          <span className="w-8 md:w-12 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
        </div>
        <FriendCard friend={friendsData.find((f) => f.id === "ner")!} />
      </motion.div>

      {/* Gitalk 评论区 */}
      <motion.div
        id="gitalk-container"
        className="mt-12 md:mt-16 scroll-mt-24 px-2 md:px-0"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
          <span className="w-8 md:w-12 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
          <h3 className="text-sm md:text-xl font-bold text-slate-800 dark:text-gray-200 tracking-widest uppercase">
            终端留言板
          </h3>
          <span className="w-8 md:w-12 h-[1px] bg-slate-300 dark:bg-slate-700"></span>
        </div>

        {/* 渲染评论组件 */}
        <Comments />
      </motion.div>

    </div>
  );
}