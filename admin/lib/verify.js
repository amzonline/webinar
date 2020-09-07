const query = require('../lib/Query');

module.exports = {
    'verifyEmail' : async function (email) {
        const regExp = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/;
        if (!regExp.test(email)) {
            return {
                field: 'email',
                error: '이메일 주소 형식이 잘 못 되었습니다.'
            };
        }

        const sql = "SELECT COUNT(*) cnt FROM TB_USER  WHERE email = :email ";
        const result = await
        query.findOne(sql, {email: email});

        if (result.cnt > 0) {
            return {
                field: 'email',
                error: '이미 가입된 이메일 주소입니다.'
            };
        }
    },
    'verifyPassword' : async function (password) {
        let charCount = 0;
        if (/[a-z]/.test(password)) {
            charCount++;
        }
        if (/[A-Z]/.test(password)) {
            charCount++;
        }
        if (/[0-9]/.test(password)) {
            charCount++;
        }
        if (/[~․!@#$%^&*()\_\-+=\[\]\[\]|\\;:<>,.?/]/.test(password)) {
            charCount++;
        }

        if (password.length < 8) {
            return {
                field: 'password',
                error: '비밀번호는 영문대/소문자/숫자/특수문자로 구성하여, 최소 8자 이상 입력 해 주세요.'
            };
        } else if (password.length < 10 && charCount < 3) {
            return {
                field: 'password',
                error: '비밀번호는 영문대/소문자/숫자/특수문자로 구성하여, 최소 3종류 이상의 조합으로 구성 해 주세요.'
            };
        } else if (charCount < 2) {
            return {
                field: 'password',
                error: '비밀번호는 영문대/소문자/숫자/특수문자로 구성하여, 최소 2종류 이상의 조합으로 구성 해 주세요.'
            };
        }
    }
}
