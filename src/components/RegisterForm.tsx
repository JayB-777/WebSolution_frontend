import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    company: "",
    name: "",
    phone: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("회원가입 요청 완료 (관리자 승인 필요)");
      navigate("/main"); // 회원가입 후 로그인 페이지로 이동
    } else {
      alert("회원가입 실패");
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="아이디"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
          required
        />
        <input
          name="company"
          placeholder="업체명"
          onChange={handleChange}
          required
        />
        <input
          name="name"
          placeholder="이름"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="휴대전화"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="이메일"
          onChange={handleChange}
          required
        />
        <button type="submit" className="register-btn">
          회원가입
        </button>
      </form>
      <button onClick={() => navigate("/main")} className="back-btn">
        로그인 화면으로 돌아가기
      </button>
    </div>
  );
}

export default RegisterForm;
