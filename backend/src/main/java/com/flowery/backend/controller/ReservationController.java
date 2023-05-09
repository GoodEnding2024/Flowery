package com.flowery.backend.controller;

import com.flowery.backend.model.dto.CardDto;
import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.sevice.MessagesService;
import com.flowery.backend.sevice.ReservationService;
import com.flowery.backend.sevice.ReservationService.AlreadyPrintedException;
import com.flowery.backend.sevice.ReservationService.NotPermittedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("reservation")
public class ReservationController {

    // 예약이 여기 모여있음 (예약 관련 CRUD)
    private ReservationService reservationService;
    private final Logger LOGGER = LoggerFactory.getLogger(ReservationController.class);

    ReservationController(ReservationService reservationService){
        this.reservationService = reservationService;
    }

    // test
    @GetMapping("hi")
    public ResponseEntity<List<ReservationDto>> findByDate(@RequestParam String date){

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
        System.out.println(dateTime);

        return new ResponseEntity<>(reservationService.findTodayReservation(dateTime), HttpStatus.ACCEPTED);
    }

    // 한 가게에 등록된 예약들을 찾아옴.
    @PostMapping("/store")
    public ResponseEntity<List<ReservationDto>> findByStoreId(@RequestBody Map<String, Integer> requestData){
        LOGGER.info("findByStoreId가 호출되었습니다.");
        int storeId = requestData.get("storeId");

        return new ResponseEntity<List<ReservationDto>>(reservationService.findByStoreId(storeId), HttpStatus.ACCEPTED);
    }

    // 등록된 예약을 승인시킴
    @PostMapping("/accept")
    public ResponseEntity<ReservationDto> acceptReservation (@RequestBody ReservationDto reservationDto) throws Exception {
        LOGGER.info("acceptReservation가 호출되었습니다.");

        try {
            return new ResponseEntity<ReservationDto>(reservationService.acceptReservation(reservationDto), HttpStatus.ACCEPTED);
        } catch (ReservationService.ReservationNotFoundException e) {
            LOGGER.error("예약을 찾을 수 없습니다.", e);
            return ResponseEntity.notFound()
                    .build();
        } catch (ReservationService.NotAuthorizedException e) {
            LOGGER.error("해당 판매자의 예약이 아닙니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        } catch (NotPermittedException e) {
            LOGGER.error("승인 거절된 예약입니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        } catch (ReservationService.AlreadyPermittedException e) {
            LOGGER.error("이미 승인된 예약입니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        } catch (Exception e){
            LOGGER.error("예약 승인에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/deny")
    public ResponseEntity<ReservationDto> denyReservation (@RequestParam String reason, @RequestBody ReservationDto reservationDto) throws Exception {
        LOGGER.info("denyReservation가 호출되었습니다.");


        LOGGER.info(reason.toString());

        try {
            return new ResponseEntity<ReservationDto>(reservationService.denyReservation(reservationDto), HttpStatus.ACCEPTED);
        } catch (ReservationService.ReservationNotFoundException e) {
            LOGGER.error("예약을 찾을 수 없습니다.", e);
            return ResponseEntity.notFound()
                    .build();
        } catch (ReservationService.NotAuthorizedException e) {
            LOGGER.error("해당 판매자의 예약이 아닙니다.", e);
            return ResponseEntity.notFound()
                    .build();
        } catch (NotPermittedException e) {
            LOGGER.error("승인 거절된 예약입니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        } catch (ReservationService.AlreadyPermittedException e) {
            LOGGER.error("이미 승인된 예약입니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null);
        } catch (Exception e){
            LOGGER.error("예약 승인에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);
        }
    }

    @PostMapping("/make")
    public ResponseEntity<Boolean> createReservation (@RequestBody ReservationDto reservationDto){
        LOGGER.info("createReservation이 호출되었습니다.");

        try{
            boolean result = reservationService.makeReservation(reservationDto);

            if(result) return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);

        }catch (Exception e){
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }

    }

    @GetMapping("/card")
    public ResponseEntity<CardDto> getCardInfo (@RequestParam Integer reservationId) {
        LOGGER.info("getCardInfo가 호출되었습니다.");

        try {
            CardDto card = reservationService.getcardInfo(reservationId);
            return ResponseEntity.ok()
                    .body(card);
        } catch (ReservationService.ReservationNotFoundException e) {
            LOGGER.error("예약을 찾을 수 없습니다.", e);
            return ResponseEntity.notFound()
                    .build();
        } catch (Exception e) {
            LOGGER.error("카드 출력에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

    @PostMapping("print")
    public ResponseEntity<Boolean> checkPrint (@RequestBody ReservationDto reservationId) {
        LOGGER.info("checkPrint가 호출되었습니다.");

        try {
            reservationService.checkPrint(reservationId);
            return ResponseEntity.ok(true);
        } catch (ReservationService.ReservationNotFoundException e) {
            LOGGER.error("예약을 찾을 수 없습니다.", e);
            return ResponseEntity.notFound()
                    .build();
        } catch (NotPermittedException e) {
            LOGGER.error("승인 거절한 예약입니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(false);
        } catch (NullPointerException e) {
            LOGGER.error("승인하지 않은 예약입니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(false);
        } catch (AlreadyPrintedException e) {
            LOGGER.error("이미 출력된 예약입니다.", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(false);
        } catch (Exception e) {
            LOGGER.error("프린트 여부 변경에 실패했습니다.", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .build();
        }
    }

}
