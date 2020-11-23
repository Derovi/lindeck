package org.lindeck.data.model.cards;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;

/**
 * @author derovi
 * This card has answer, that shows hust by click.
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class CardExtended extends AbstractCard {
    private String answer;
}
