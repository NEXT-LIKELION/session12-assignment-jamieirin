import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [showData, setShowData] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://api.kcisa.kr/API_CNV_045/request?serviceKey=cde0f9c0-54ad-4519-a219-1f6afd634492&numOfRows=100&pageNo=1',
          { headers: { 'Accept': 'application/json' } }
        );
        const result = await response.json();
        setData(result.response.body.items.item);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      {!showData ? (
        <div className="intro">
          <h1>📚 Welcome to Bookstore Info</h1>
          <p>베스트셀러, 절판도서 웃돈 없이 저렴하게 구하는 법🫢</p>
          <button
            className="start-button"
            onClick={() => setShowData(true)}
          >
            중고서점 둘러보기
          </button>
        </div>
      ) : (
        <div className="list-page">
          <div className="list-header">
            <button
              className="back-button"
              onClick={() => setShowData(false)}
              aria-label="처음으로 돌아가기"
            >
              ⬅ 이전
            </button>
            <h1 className="list-title">전국 중고서점 리스트</h1>
          </div>

          {data ? (
            <div className="card-grid">
              {data.map((item, idx) => (
                <div className="card" key={idx}>
                  <h2>{item.FCLTY_NM || '제목 없음'}</h2>
                  <p>📍 {item.FCLTY_ROAD_NM_ADDR || '주소 없음'}</p>
                  <p>📞 {item.TEL_NO || '전화번호 없음'}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <div className="promo-banner">
            프로모션/제휴 문의 : jamieirin@gmail.com
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
