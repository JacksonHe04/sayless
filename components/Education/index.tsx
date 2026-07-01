import { getCurrentResumeData } from '@/config/data'
import { SectionContainer, SectionTitle, UniversalImage } from '@/components/common'
import { LAYOUT_STYLES, TEXT_STYLES, CONTAINER_STYLES, TITLE_STYLES } from '@/constants/styles'

/**
 * 教育经历组件 - 展示学历信息
 * 从统一的简历数据源中读取教育经历信息进行渲染
 */
export default function Education() {
  const { education } = getCurrentResumeData()

  // 如果没有教育经历数据，不渲染组件
  if (!education) return null

  return (
    <SectionContainer>
      <SectionTitle>{education.title}</SectionTitle>
      <div className={CONTAINER_STYLES.project}>
        <div className={LAYOUT_STYLES.flexBetweenMb}>
          <div className="flex items-center gap-2 flex-wrap">
            {education.image && (
              <UniversalImage
                src={education.image}
                alt={`${education.school} logo`}
                width={36}
                height={36}
                className="object-contain flex-shrink-0"
              />
            )}
            <h3 className={`${TITLE_STYLES.project} leading-none`}>
              <span className="font-bold">{education.school}</span>
            </h3>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <span className={TEXT_STYLES.period}>{education.base}</span>
            <span className={TEXT_STYLES.period}>｜{education.period}</span>
          </div>
        </div>
        <p className={TEXT_STYLES.base}>{education.details}</p>
      </div>
    </SectionContainer>
  )
}