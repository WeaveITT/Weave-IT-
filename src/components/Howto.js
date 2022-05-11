import Header from "./Header";
import "./Howto.css";
export default function Howto() {
  return (
    <div className="howto">
      <div className="howtoTitle">
        <Header />
        <div className="howtoTitle-title">HOW TO</div>
        <div className="howtoTitle-subtitle">
          Weave;IT에 오신 여러분을 환영합니다!
          <br />
          직물 패턴 디자인이 생소하시다면 아래 메뉴얼을 참고하여 작업을 진행해
          주세요.
        </div>
      </div>
      <div className="howto-main">사용 방법</div>
      <div className="howto-step">
        1. 새 파일 아이콘을 눌러 기본 실행 화면을 준비합니다.
      </div>
    </div>
  );
}
