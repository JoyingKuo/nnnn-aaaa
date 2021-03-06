import React from 'react'
import './GradTable.css'

import GradSubject from './GradSubject'

class GradCategory extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: this.props.name,
      subjects: this.props.subjects
    }
  }
  render () {
    let subjects = this.state.subjects
    for (let i = 0; i < subjects.length; i++) {
      // comment
      if (this.state.name === '通識') { subjects[i].comment = subjects[i].dimension + '向度 ' } else { subjects[i].comment = '' }

      // 抵免
      if (subjects[i].reason === 'notCS') {
        subjects[i].comment += '此為外系課程，必須申請過抵免才能算通過。'
        subjects[i].score = ''
      } else if (subjects[i].reason === 'free1') {
        subjects[i].comment += '已抵免'
        subjects[i].score = '抵免'
      } else if (subjects[i].reason === 'free2') {
        subjects[i].comment += '免修課程'
      } else if (subjects[i].reason === 'now') {
        subjects[i].comment += '當期課程'
        subjects[i].score = '　'
      }

      if (subjects[i].score === -1) { subjects[i].score = '' }

      // score
      if (subjects[i].score === null) {
        if (subjects.grade === null) { subjects[i].score = (subjects[i].complete === true) ? '通過' : '未過' } 
        else { subjects[i].score = subjects[i].grade }
      }

      // 未修
      if ((subjects[i].score === null || subjects[i].score === -1) && subjects[i].complete === false) {
        this.state.subjects[i].realCredit = '　'
        this.state.subjects[i].originalCredit += '　'
      }
    }

    let gept = this.props.graduationCheckEnglishTest
    let geptShow = [(gept === '3' || gept === '4') ? 'V' : ' ', (gept === '0') ? 'V' : ' ', (gept === '1') ? 'V' : ' ', (gept === '2') ? 'V' : ' ']

    return (
      <tbody>
        <tr>
          <td className='title-text' rowSpan={this.state.subjects.length + 1 + (this.state.name === '外語')}>{this.state.name}</td>
          <td className='title-text'>科目名稱</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>1上</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>1下</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>2上</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>2下</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>3上</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>3下</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>4上</td>
          <td style={{ fontSize: '8pt', fontWeight: 'bold' }}>4下</td>
          <td style={{ fontSize: '6pt', fontWeight: 'bold' }}>應修<br />學分</td>
          <td style={{ fontSize: '6pt', fontWeight: 'bold' }}>實得<br />學分</td>
          <td className='title-text'>備註</td>
        </tr>

        {this.state.subjects.map(subject =>
          <GradSubject
            key={subject.name}
            name={subject.cn + ' ' + subject.en + ((subject.english === true) ? ' [英語授課]' : '')}
            credit={subject.originalCredit}
            realCredit={subject.realCredit}
            score={subject.score}
            semester={subject.semester}
            year={subject.year}
            comment={subject.comment}
          />
        )}
        {this.state.name === '外語' &&
        <tr>
          <td className='bg-orange left-text' colSpan='12'>
            <span>★英檢：&nbsp;&nbsp;通過({geptShow[0]})&nbsp;&nbsp;&nbsp;未通過({geptShow[1]})&nbsp;&nbsp;&nbsp;已抵免({geptShow[2]})&nbsp;&nbsp;&nbsp;英文換修({geptShow[3]})</span><br />
            <span style={{ fontSize: '8pt', fontWeight: 'bold', color: '#0000FF' }}>未通過者請勾選 (  )加修並通過「英文進階課程」4學分  (  )於畢業前自行報名並通過所列任ㄧ英文能力檢定考試與標準</span>
          </td>
        </tr>
        }
      </tbody>
    )
  }
}

export default GradCategory
