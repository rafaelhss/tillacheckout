package tillacheckout.venda.comprovante;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import tillacheckout.venda.Venda;

import javax.persistence.*;

/**
 * Created by rafa on 27/08/2016.
 */
@Getter
@Setter
@Entity
public class Comprovante {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    //@Lob
    @JsonIgnore
    @Column( length = 5000000 )
    private byte[] file;
    //private File file;
/*
    @OneToOne
    private Venda venda;*/
}
