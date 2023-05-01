package com.flowery.backend.sevice;

import com.flowery.backend.model.dto.ReservationDto;
import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class ReservationService {

    // 예약 거부, 승인, 확인 등이 여기 있음

    private ReservationRepository reservationRepository;

    ReservationService(ReservationRepository reservationRepository){
        this.reservationRepository = reservationRepository;
    }

    public List<ReservationDto> findTodayReservation(LocalDateTime dateTime){

        LocalDateTime yesterday = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(0,0,0));
        LocalDateTime today = LocalDateTime.of(LocalDate.from(dateTime), LocalTime.of(23,59,59));

        List<Reservation> list = reservationRepository.findAllByDateBetween(yesterday,today);
        List<ReservationDto> result = new ArrayList<>();

        for(int i=0; i<list.size(); i++){

            ReservationDto tmp = new ReservationDto();
            tmp.setReservationId(list.get(i).getReservationId());
            tmp.setDate(list.get(i).getDate());
            tmp.setPrice(list.get(i).getPrice());
            tmp.setDemand(list.get(i).getDemand());
            tmp.setPermission(list.get(i).getPermission());
            tmp.setPrinted(list.get(i).getPrinted());
            tmp.setUserId(list.get(i).getUserId().getUsersId());
            tmp.setStoreId(list.get(i).getStoreId().getStoreId());
            tmp.setGoodsName(list.get(i).getGoodsName());

            result.add(tmp);
        }

        return result;

    }

}