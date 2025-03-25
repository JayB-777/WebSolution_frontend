import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    company: "",
    userName: "",
    phoneNumber: "",
    email: "",
  });

  const navigate = useNavigate();

  // 📌 전화번호 유효성 검사
  const isValidPhoneNumber = (phone: string) =>
    /^01[016789]-\d{3,4}-\d{4}$/.test(phone);

  // 📌 이메일 유효성 검사
  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // 📌 전체 유효성 검사
  const isFormValid =
    formData.loginId.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.company.trim() !== "" &&
    formData.userName.trim() !== "" &&
    isValidPhoneNumber(formData.phoneNumber) &&
    isValidEmail(formData.email);

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

    const data = await response.json();
    if (response.ok && data.isSuccess) {
      alert("회원가입 요청 완료 (관리자 승인 필요)");
      navigate("/main");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="loginId"
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
          name="userName"
          placeholder="이름"
          onChange={handleChange}
          required
        />
        <input
          name="phoneNumber"
          placeholder="휴대전화 (예: 010-1234-5678)"
          onChange={handleChange}
          required
        />
        {!isValidPhoneNumber(formData.phoneNumber) &&
          formData.phoneNumber.length > 0 && (
            <p className="error-message">전화번호 형식이 올바르지 않습니다.</p>
          )}
        <input
          name="email"
          placeholder="이메일"
          onChange={handleChange}
          required
        />
        {!isValidEmail(formData.email) && formData.email.length > 0 && (
          <p className="error-message">이메일 형식이 올바르지 않습니다.</p>
        )}
        <p className="register-notice">※ 관리자 승인 후 로그인 가능합니다.</p>
        <button type="submit" className="register-btn" disabled={!isFormValid}>
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
