package org.lindeck.data.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Date;

/**
 * @author derovi
 */

@Data
@Entity
public class DeleteRecord {
    @Id
    @GeneratedValue
    private int id;

    private int cardId;
    private Date deletedAt;
}
