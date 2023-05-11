import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 로그인 여부
export const isLoggedIn = atom<boolean>({
  key: "isLoggedIn",
  default: false,
  // effects_UNSTABLE: [persistAtom],
});

// 인증된 전화번호
export const phoneNumberState = atom<string>({
  key: "phoneNumberState",
  default: "0",
  effects_UNSTABLE: [persistAtom],
});

// 업로드한 이미지
export const imageState = atom<Array<File>>({
  key: "imageState",
  default: [],
  //   effects_UNSTABLE: [persistAtom],
});

// 업로드한 영상
export const videoState = atom<File | null>({
  key: "videoState",
  default: null,
  //   effects_UNSTABLE: [persistAtom],
});

// 편지지 종류
export const letterPaperState = atom<number>({
  key: "letterPaperState",
  default: 2,
  effects_UNSTABLE: [persistAtom],
});

// 편지 글씨체
export const letterFontState = atom<number>({
  key: "letterFontState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

// 편지 내용
export const totalTextState = atom<string>({
  key: "totalTextState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

//예약 정보
export const reservationInfo = atom({
  key: "resrvationInfo",
  default: {
    userId: 1,
    storeId: 1,
    messageId: "1",
    goodsName: "장미다발",
    price: 10000,
    demand: "여기 요청사항이 적혀진다 이말이야",
    date: "2023-05-04T11:44:30.32795",
    reservationName: "예약명",
    phrase: "구매자 입력하는 짧은 카드 문구",
  },
});

//가게 정보
export const shopInfo = atom({
  key: "shopInfo",
  default: [{}],
});
