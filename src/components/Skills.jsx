import React, { useEffect, useRef } from 'react'
import '../styles/Skills.css'

const StarRating = ({ rating, animated = false, delay = 0 }) => {
  const stars = []
  
  for (let i = 1; i <= 5; i++) {
    let starClass = 'star'
    
    if (i <= Math.floor(rating)) {
      starClass += ' full'
    } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
      starClass += ' half'
    } else {
      starClass += ' empty'
    }
    
    if (animated) {
      starClass += ' animated'
    }
    
    stars.push(
      <span
        key={i}
        className={starClass}
        style={{ animationDelay: animated ? `${delay + (i - 1) * 0.1}s` : '0s' }}
      >
        ★
      </span>
    )
  }
  
  return <div className="star-rating">{stars}</div>
}

const Skills = () => {
  const skillsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
          
          // 觸發星星動畫
          const starRatings = entry.target.querySelectorAll('.star-rating')
          starRatings.forEach((rating, index) => {
            const stars = rating.querySelectorAll('.star.animated')
            stars.forEach(star => {
              star.classList.add('animate')
            })
          })
        }
      })
    }, { threshold: 0.1 })

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const skillCategories = [
    {
      title: "專案管理與團隊溝通",
      skills: [
        { name: "專案規劃與推進", rating: 4.5 },
        { name: "跨部門協作與溝通", rating: 5 }
      ]
    },
    {
      title: "系統訪談與規劃分析",
      skills: [
        { name: "需求訪談與流程設計", rating: 4.5 },
        { name: "系統分析文件撰寫", rating: 4 }
      ]
    },
    {
      title: "產品設計與UX",
      skills: [
        { name: "UI設計與原型製作 / UX使用者體驗設計", rating: 4 },
        { name: "Axure RP/ Figma", rating: 4.5 }
      ]
    },
    {
      title: "簡報設計與提案",
      skills: [
        { name: "簡報架構與視覺設計", rating: 5 },
        { name: "提案與說服力", rating: 4.5 }
      ]
    },
    {
      title: "規格文件與資料彙整",
      skills: [
        { name: "規格文件撰寫", rating: 4 },
        { name: "資料彙整與分析", rating: 4.5 }
      ]
    },
    {
      title: "AI產品規劃",
      skills: [
        { name: "AI技術掌握", rating: 3.5 },
        { name: "Vibe Coding與實作", rating: 4.5 }
      ]
    }
  ]

  return (
    <section id="skills" ref={skillsRef}>
      <h2 className="section-title fade-in">技能專長</h2>
      <div className="skills-container">
        {skillCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="skill-category fade-in">
            <h3>{category.title}</h3>
            {category.skills.map((skill, skillIndex) => (
              <div key={skillIndex} className="skill-item">
                <div className="skill-name">
                  <span>{skill.name}</span>
                </div>
                <StarRating 
                  rating={skill.rating} 
                  animated={true} 
                  delay={categoryIndex * 0.2 + skillIndex * 0.1}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills 