package org.lindeck.data.model.cards;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;

/**
 * @author derovi
 * This card has input field, so user answer will be validated.
 */

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class CardWithInput extends AbstractCard {
    public enum AnswerType {
        INTEGER, FLOAT, STRING
    }

    /**
     * Type of answer.
     * It can be either integer, float or string.
     */
    @Enumerated(EnumType.STRING)
    private AnswerType answerType;

    /**
     * Answer is stored as string, but it can be either integer, float or string.
     * Validator recognizes answer type according to {@link AnswerType}
     */
    private String answer;
}
