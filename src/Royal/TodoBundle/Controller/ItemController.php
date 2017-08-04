<?php

namespace Royal\TodoBundle\Controller;

use Doctrine\ORM\EntityManager;
use Royal\TodoBundle\Entity\TodoItem;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * Item controller.
 *
 */
class ItemController extends Controller
{

    /**
     * @var \Symfony\Component\Serializer\Serializer
     */
    public $serializer;

    public function __construct()
    {
        $encoders = [
            new XmlEncoder(),
            new JsonEncoder(),
        ];
        $normalizers = [
            new ObjectNormalizer(),
        ];

        $this->serializer = new Serializer($normalizers, $encoders);
    }

    /**
     * Lists all item entities.
     *
     */
    public function indexAction()
    {
        /** @var \Doctrine\Common\Persistence\ObjectManager $em */
        $em = $this->getDoctrine()->getManager();

        /** @var \Royal\TodoBundle\Entity\TodoItem[] $items */
        $items = $em->getRepository('RoyalTodoBundle:TodoItem')->findBy([], [
            'id' => 'DESC',
        ]);

        $array_items = [];
        foreach ($items as $item) {
            if ($item->getStatus() == TodoItem::STATUS_DELETED) {
                continue;
            }
            $array_items[] = $this->jsonEncode($item);
        }

        return $this->json([
            'items' => $array_items,
        ]);
    }

    /**
     * Creates a new item entity.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function newAction(Request $request)
    {
        /** @var \Doctrine\Common\Persistence\ObjectManager $em */
        $em = $this->getDoctrine()->getManager();

        // royal_todobundle_item[field_name]
        $item = new TodoItem();
        $item->update($request->request->all());

        if ('Is Valid') { // TODO: Validation
            $em->persist($item);
            $em->flush();

            return $this->json([
                'item' => $this->jsonEncode($item),
            ]);
        }

        return $this->json([
            'errors' => $this->jsonEncode([]),
        ], 400);
    }

    /**
     * Finds and displays a item entity.
     *
     * @param \Royal\TodoBundle\Entity\TodoItem $item
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showAction(TodoItem $item)
    {
        if ($item->getStatus() === TodoItem::STATUS_DELETED) {
            return $this->json([
                'errors' => $this->jsonEncode(["Item not found or deleted"]),
            ], 404);
        }

        return $this->json([
            'item' => $this->jsonEncode($item),
        ]);
    }

    /**
     * Displays a form to edit an existing item entity.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Royal\TodoBundle\Entity\TodoItem $item
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function editAction(Request $request, TodoItem $item)
    {
        if ($item->getStatus() === TodoItem::STATUS_DELETED) {
            return $this->json([
                'errors' => $this->jsonEncode(["Item not found or deleted"]),
            ], 404);
        }

        /** @var \Doctrine\Common\Persistence\ObjectManager $em */
        $em = $this->getDoctrine()->getManager();

        $item->update($request->request->all());

        if ('Is Valid') { // TODO: Validation
            $em->persist($item);
            $em->flush();

            return $this->json([
                'item' => $this->jsonEncode($item),
            ]);
        }

        return $this->json([
            'item' => $this->jsonEncode($item),
            'errors' => $this->jsonEncode([]),
        ], 400);
    }

    /**
     * Deletes a item entity.
     *
     * @param \Symfony\Component\HttpFoundation\Request $request
     * @param \Royal\TodoBundle\Entity\TodoItem $item
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function deleteAction(Request $request, TodoItem $item)
    {
        $form = $this->createDeleteForm($item);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $deleted = clone $item;
            $em = $this->getDoctrine()->getManager();
            $em->remove($item);
            $em->flush();

            return $this->json([
                'item' => $this->jsonEncode($deleted),
            ]);
        }

        return $this->json([
            'item' => $this->jsonEncode($item),
            'errors' => $this->jsonEncode($form->getErrors()),
//            'token' => $csrf,
        ], 400);
    }

    /**
     * Creates a form to delete a item entity.
     *
     * @param \Royal\TodoBundle\Entity\TodoItem $item The item entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(TodoItem $item)
    {
        $form = $this->createFormBuilder()->setAction(
            $this->generateUrl('item_delete', [
                'id' => $item->getId()
            ])
        );

        return $form->setMethod('DELETE')->getForm();
    }

    /**
     * @return \Symfony\Component\Security\Csrf\CsrfTokenManager
     */
    protected function csrfTokenManager()
    {
        /** @var \Symfony\Component\Security\Csrf\CsrfTokenManager $csrf */
        $csrf = $this->get("security.csrf.token_manager");

        return $csrf;
    }

    /**
     * @param string $tokenId
     *
     * @return string
     */
    protected function getCsrfToken(string $tokenId)
    {
        return $this->csrfTokenManager()->getToken($tokenId)->getValue();
    }

    /**
     * @param mixed $data
     *
     * @return mixed
     */
    protected function jsonEncode($data)
    {
        return json_decode($this->serializer->serialize($data, 'json'), true);
    }

    /**
     * Allow origin AJAX.
     *
     * {@inheritdoc}
     */
    public function json($data, $status = 200, $headers = [], $context = []) {
        $response = parent::json($data, $status, $headers, $context);
        $response->headers->set('Access-Control-Allow-Origin', '*');

        return $response;
    }

}
