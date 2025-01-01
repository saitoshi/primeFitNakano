'use client';
import './style.css';

export const FaqCard = () => {
  const faqList = [
    {
      question: '駐車場はありますか？',
      answer:
        '専用駐車場が無い為、お車でお越しの際は店舗周辺のパーキングに停めて頂く形になります。',
    },
    {
      question: 'シャワーはありますが？',
      answer: 'シャワーはないです。',
    },
    {
      question:
        '女性でも大丈夫でしょうか？ムキムキにはなりたくないですし、お肌も綺麗に保ちたいのですが。',
      answer:
        '目標に合わせてトレーニングメニューを決定しますので、必要な筋肉をつけ綺麗に痩せるためのトレーニングをご提供いたします。',
    },
  ];
  return (
    <>
      <div id='faqSection'>
        <div className='faqCard'>
          <h3>Q. 決済方法教えて下さい。</h3>
          <div className='answerSection'>
            <p>
              以下の決済方法に対応しております。
              <li>クレジットカード</li>
              <li>現金</li>
              <li>PayPay</li>
            </p>
          </div>
        </div>
        {faqList.map((question) => {
          return (
            <div key={question.question} className='faqCard'>
              <h3>Q. {question.question}</h3>
              <div className='answerSection'>
                <p>{question.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
