package com.flowery.backend.sevice;

import com.flowery.backend.model.entity.Messages;
import com.flowery.backend.model.entity.Pictures;
import com.flowery.backend.model.entity.Reservation;
import com.flowery.backend.repository.MessagesRepository;
import com.flowery.backend.repository.PicturesRepository;
import com.flowery.backend.repository.ReservationRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessagesService {

    private MessagesRepository messagesRepository;
    private PicturesRepository picturesRepository;
    private ReservationRepository reservationRepository;

    MessagesService(MessagesRepository messagesRepository, PicturesRepository picturesRepository,
                    ReservationRepository reservationRepository){
        this.messagesRepository = messagesRepository;
        this.picturesRepository = picturesRepository;
        this.reservationRepository = reservationRepository;
    }

    public Messages findById(int code){
        return messagesRepository.findById(code).get();
    }


    public Messages findByMessageId(int id){
        Messages message = messagesRepository.findByMessageId(id);
//        기본 제공하는 findby를 사용해서 repository 안 만들고 할 때
//        Messages message = messagesRepository.findByMessageId(id).get();
        return message;

    }

    public Messages createCard(String videoUrl, List<String> pictureUrl, String messageValue, Integer paperValue, Integer fontValue) throws Exception{
        Messages message = new Messages();

        // 메시지와 비디오, 사진 값이 비어있지 않다면 넣어준다.
        if(videoUrl != null){
            message.setVideo(videoUrl);
        }
        if(messageValue != null){
            message.setMessage(messageValue);
        }
        message.setPaper(paperValue);
        message.setFont(fontValue);

        Messages result = messagesRepository.save(message);

        for(int i=0; i<pictureUrl.size(); i++){
            Pictures pictures = new Pictures();
            pictures.setUrl(pictureUrl.get(i));
            pictures.setMessageId(result);
            picturesRepository.save(pictures);
        }

        return result;
    }

    public Messages addFlowerPicture (String pictureUrl, Integer reservationId) throws Exception {
        Reservation reservation = reservationRepository.findById(reservationId).get();
        int messageId = reservation.getMessageId().getMessageId();
        Messages result = messagesRepository.findById(messageId).get();
        result.setFlowerPicture(pictureUrl);

        return messagesRepository.save(result);
    }
}
