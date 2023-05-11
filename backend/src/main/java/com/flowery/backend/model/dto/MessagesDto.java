package com.flowery.backend.model.dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class MessagesDto {

    private String messageId;
    private String message;
    private String video;
    private String flowerPicture;
    private int papers;
    private int font;
    private LocalDateTime messageDate;
    private int poemId;
    private int phraseId;
    private int meanId;
    private List<String> pictures;
    
}
