package tillacheckout.venda.comprovante;

import org.springframework.data.repository.CrudRepository;
import tillacheckout.venda.Venda;

/**
 * Created by rafa on 27/08/2016.
 */
public interface ComprovanteRepository  extends CrudRepository<Comprovante, Long> {
    Comprovante findByVenda(Venda venday);
}
