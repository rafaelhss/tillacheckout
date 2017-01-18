package tillacheckout.venda;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

/**
 * Created by rafa on 27/08/2016.
 */
public interface VendaRepository extends CrudRepository<Venda, Long> {
    List<Venda> findByContato(String contato);
    Page<Venda> findAllByOrderByDataDesc(Pageable pageable);
    Page<Venda> findByVendaStatusOrderByDataDesc(VendaStatus vendaStatus, Pageable pageable);
}
